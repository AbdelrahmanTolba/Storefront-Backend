import * as bcrypt from 'bcrypt';
import config from '../config';

const hashingUserPassword = (password: string) => {
  const salt: number = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(password + config.pepper, salt);
};
const checkingOnPassword = (
  plainTextPassword: string,
  hashedPassword: string
): boolean =>
  bcrypt.compareSync(
    `${plainTextPassword}${config.pepper}`,
    `${hashedPassword}`
  )
    ? true
    : false;

export { hashingUserPassword, checkingOnPassword };
