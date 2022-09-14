import { User } from './../interfaces/user.interface';
import Client from '../database';
import { hashingUserPassword } from '../controllers/hashPassword';

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't found users => ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't found user => ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const result = await conn.query(sql, [
        u.email,
        u.firstname,
        u.lastname,
        hashingUserPassword(u.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't create users => ${error}`);
    }
  }
  async update(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE users SET email = ($1), firstname = ($2), lastname = ($3), password = ($4) WHERE id = ($5) RETURNING *';

      const result = await conn.query(sql, [
        u.email,
        u.firstname,
        u.lastname,
        hashingUserPassword(u.password),
        u.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't update users => ${error}`);
    }
  }
  async delete(id: number): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete users => ${error}`);
    }
  }
}
