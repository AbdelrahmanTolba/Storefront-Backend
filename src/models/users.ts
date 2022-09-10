import { User } from './../interfaces/index';
import * as bcrypt from 'bcrypt';
import Client from '../database';

const { SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`user is not found ${error}`);
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
      throw new Error(`user is not found ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password,
        parseInt(SALT_ROUNDS as string, 10)
      );
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`user is not found ${error}`);
    }
  }
  async deleteuser(id: number): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
}
