import { User } from './../interfaces/index';
import express, { Request, Response } from 'express';
import { UserStore } from '../models/users';
import jwt from 'jsonwebtoken';

const Users = new UserStore();
const { TOKEN_SECRET } = process.env;

const showAll = async (_req: Request, res: Response) => {
  try {
    const user: User[] = await Users.index();
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'showAll',
      error: error,
    });
  }
};
const showUser = async (req: Request, res: Response) => {
  try {
    const userId: number = req.params.id as unknown as number;
    const user: User = await Users.show(userId);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'createUser',
      error: error,
    });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo: User = {
      firstname: req.body.firstname as unknown as string,
      lastname: req.body.lastname as unknown as string,
      password: req.body.password as unknown as string,
    };

    if (!userInfo.firstname || !userInfo.lastname || !userInfo.password) {
      res.status(404);
      res.json({
        error: `firstname is < ${userInfo.firstname} >, lastname is < ${userInfo.lastname} > and password is < ${userInfo.password} > `,
      });
      return;
    }

    const user: User = await Users.create(userInfo);
    const token = jwt.sign({ userInfo: user }, `${TOKEN_SECRET}`);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      method: 'createUser',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = req.params.id as unknown as number;
    console.log(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user: User[] = await Users.deleteuser(userId);
    res.json(`user  ${userId} is deleted successfully`);
  } catch (error) {
    res.status(400);
    res.json({
      method: 'deleteUser',
      error: error,
    });
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', showAll);
  app.get('/users/:id', showUser);
  app.post('/users', createUser);
  app.delete('/users/:id', deleteUser);
};
export default users_routes;
