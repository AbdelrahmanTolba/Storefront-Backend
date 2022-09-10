import { Product } from './../interfaces/index';
import Client from '../database';

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
  async deleteProduct(id: number): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id = ($1)';

      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
  async topFiveProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`product is not found ${error}`);
    }
  }
}
