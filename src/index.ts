/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';

import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import orderRoute from './routes/order.route';

const app: express.Application = express();
const port = config.port || 3000;

const address: string = '0.0.0.0:3000';

//PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//HTTP LOGGER MIDDLEWARE
// app.use(morgan('comman'));
//HTTP SECUIRE
app.use(helmet());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.get('/', (_req: Request, res: Response) => {
  res.send(`<h1>Welcome to my storefront Backend project</h1>`);
});

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
