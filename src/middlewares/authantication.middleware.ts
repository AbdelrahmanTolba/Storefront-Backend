import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../controllers/tokens';

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
    verifyToken(token);
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
