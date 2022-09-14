import express from 'express';
import { logging, authantication, logout } from '../controllers/authantication';

const loginUserRoute = express.Router();

loginUserRoute.post('/login', logging);
loginUserRoute.post('/auth', authantication);
loginUserRoute.post('/logout', logout);

export default loginUserRoute;
