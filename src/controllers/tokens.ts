import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../interfaces/user.interface';

const getToken = (user: User | string): string => {
  return jwt.sign(user, `${config.tokenSecret}`);
};
const verifyToken = (token:string) => {
  return jwt.verify(token, `${config.tokenSecret}`);
};
export { getToken, verifyToken };
