import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

dotenv.config();

const client = new Pool({
  port: parseInt(config.dbPort as string),
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

export default client;
