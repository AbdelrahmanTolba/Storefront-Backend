import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import db from './database';


const app: express.Application = express();
const port = config.port || 3000;
const address: string = '0.0.0.0:3000';

//PARSING MIDDLEWARE
app.use(express.json());
//HTTP LOGGER MIDDLEWARE
app.use(morgan('comman'));
//HTTP SECUIRE
app.use(helmet());


app.get('/', (_req: Request, res: Response) => {
  res.json('hola');
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
