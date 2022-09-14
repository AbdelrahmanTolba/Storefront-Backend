import { User } from '../interfaces/user.interface';
import Client from '../database';

import { checkingOnPassword } from '../controllers/hashPassword';

export class LoggingStore {
  async loginUser(email: string, password: string): Promise<User | void> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE email = ($1)';
      const result = await conn.query(sql, [email]);
      const hassedpassword = result.rows[0].password;
      const isValid = checkingOnPassword(password, hassedpassword);

      if (isValid) {
        const userInfoSql = 'SELECT * FROM users WHERE email = ($1)';
        const userResult = await conn.query(userInfoSql, [email]);
        conn.release();
        return userResult.rows[0];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async authenticatedUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE email=$1';
    const result = await conn.query(sql, [email]);
    const hashedPassword = result.rows[0].password;

    if (result.rows.length) {
      const user = result.rows[0];
      const isValid = checkingOnPassword(password, hashedPassword)
      if (isValid) {
        return user;
      }
    }
    return null;
  }
  
}
