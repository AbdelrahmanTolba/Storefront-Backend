import * as bcrypt from 'bcrypt';
import config from '../config';

const hashingUserPassword = (password: string) => {
  const salt: number = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(password + config.pepper, salt);
};
export default hashingUserPassword;
