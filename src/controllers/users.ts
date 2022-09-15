import { User } from './../interfaces/user.interface';
import { Request, Response } from 'express';
import { UserStore } from '../models/users';
import { getToken } from './tokens';

const Users = new UserStore();

const showAll = async (_req: Request, res: Response) => {
  try {
    const user: User[] = await Users.index();
    res.json(user).status(200);
  } catch (error) {
    res.status(400);
    res.json({
      status: 400,
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
      status: 400,
      method: 'showUser',
      error: error,
    });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo: User = {
      email: req.body.email as unknown as string,
      firstname: req.body.firstname as unknown as string,
      lastname: req.body.lastname as unknown as string,
      password: req.body.password as unknown as string,
    };

    if (
      !userInfo.email ||
      !userInfo.firstname ||
      !userInfo.lastname ||
      !userInfo.password
    ) {
      res.status(400);
      res.json({
        status: 400,
        method: 'createUser',
        error: `firstname is < ${userInfo.firstname} >, lastname is < ${userInfo.lastname} > and password is < ${userInfo.password} > `,
      });
      return;
    }

    const user: User = await Users.create(userInfo);
    const token = getToken(user);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json({
      status: 400,
      method: 'createUser',
      error: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userInfo: User = {
      id: req.body.id as unknown as number,
      email: req.body.email as unknown as string,
      firstname: req.body.firstname as unknown as string,
      lastname: req.body.lastname as unknown as string,
      password: req.body.password as unknown as string,
    };

    if (
      !userInfo.id ||
      !userInfo.email ||
      !userInfo.firstname ||
      !userInfo.lastname
    ) {
      res.status(400);
      res.json({
        status: 400,
        method: 'updateUser',
        error: `id is < ${userInfo.id} >, firstname is < ${userInfo.firstname} > and lastname is < ${userInfo.lastname} >  `,
      });
      return;
    }

    const user: User = await Users.update(userInfo);
    const token = getToken(user);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json({
      status: 400,
      method: 'createUser',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = req.params.id as unknown as number;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user: User[] = await Users.delete(userId);
    res.json(`user  ${userId} is deleted successfully`);
  } catch (error) {
    res.status(400);
    res.json({
      status: 400,
      method: 'deleteUser',
      error: error,
    });
  }
};

export { showAll, showUser, updateUser, createUser, deleteUser };
