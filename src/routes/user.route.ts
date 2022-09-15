import express from 'express';
import {
  showAll,
  showUser,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/users';
import tokenValidationMiddleWare from '../middlewares/authantication.middleware';

const userRoute = express.Router();

userRoute.get('/',tokenValidationMiddleWare, showAll);
userRoute.get('/:id', tokenValidationMiddleWare, showUser);
userRoute.post('/create', createUser);
userRoute.put('/edit', tokenValidationMiddleWare, updateUser);
userRoute.delete('/:id', tokenValidationMiddleWare, deleteUser);

export default userRoute;
