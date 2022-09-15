import { LoggingStore } from '../models/authantication';
import { Request, Response } from 'express';
import { getToken } from './tokens';

const Users = new LoggingStore();

const logging = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as unknown as string;
    const password = req.body.password as unknown as string;

    if (!email || !password) {
      res.status(400);
      res.json({
        status: 400,
        method: 'logging',
        error: `email is < ${email} > and password is < ${password} > `,
      });
      return;
    }
    const user = await Users.loginUser(email, password);
    if (!user) {
      res
        .json({
          method: 'logging',
          error: 'Email or password is wrong',
        })
        .status(400);
      return;
    }
    const token = getToken(user);
    res
      .json({
        user: `${user.firstname} ${user.lastname}`,
        status: 'LoggedIn',
        token: token,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      status: 400,
      method: 'logging',
      error: error,
    });
  }
};
const authantication = async (req: Request, res: Response) => {
  try {
    const user = await Users.authenticatedUser(
      req.body.email,
      req.body.password
    );
    if (user) {
      const token = getToken(user);
      res.json({
        User: `${user.firstname} ${user.lastname}`,
        status: 'Authanticated',
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.json('Token deleted').status(200);
  } catch (error) {
    res.json({
      method: 'logout',
      error: error,
    });
  }
};
export { logging, authantication, logout };
