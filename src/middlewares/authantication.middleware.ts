import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const tokenValidationMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
): void | boolean => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) {
    res.status(404);
    res.json({
      status: 404,
      method: 'tokenValidationMiddleWare',
    });
    return;
  }
  try {
    const token: string = authHeader.split(' ')[1];
    jwt.verify(token, `${config.tokenSecret}`);
    next();
  } catch (error) {
    res.status(404);
    res.json({
      status: 404,
      error: `non validate token => ${error}`,
    });
    return false;
  }
};

export default tokenValidationMiddleWare;
