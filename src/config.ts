import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: parseInt(PORT as string, 10),
  dbPort: POSTGRES_PORT,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  password: POSTGRES_PASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
