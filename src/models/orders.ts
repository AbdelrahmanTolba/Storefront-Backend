import { Order } from './../interfaces/index';
import Client from '../database';

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`order is not found ${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`order is not found ${error}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *';

      const result = await conn.query(sql, [
        o.product_id,
        o.user_id,
        o.quantity,
        o.status,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`order is not found ${error}`);
    }
  }
  async userOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * from orders where user_id=($1)';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`could not get user orders ${error}`);
    }
  }
  async deleteOrder(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id = ($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`order is not found ${error}`);
    }
  }
}
