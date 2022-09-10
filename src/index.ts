/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import users_routes from './controllers/users';
import bodyParser from 'body-parser';
import products_routes from './controllers/products';
import orders_routes from './controllers/orders';

const app: express.Application = express();
const port = config.port || 3000;

const address: string = '0.0.0.0:3000';

//PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//HTTP LOGGER MIDDLEWARE
app.use(morgan('comman'));
//HTTP SECUIRE
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
  res.json('hola');
});
users_routes(app);
products_routes(app);
orders_routes(app);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
