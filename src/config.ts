import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_PASSWORD,
} = process.env;

export default {
  port: parseInt(PORT as string, 10),
  dbPort: POSTGRES_PORT,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  password: POSTGRES_PASSWORD,
};
