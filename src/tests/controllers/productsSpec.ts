import { ProductStore } from './../../models/products';
import jwt from 'jsonwebtoken';

import supertest from 'supertest';
import app from '../../index';
import config from '../../config';
import Client from '../../database';
import { Product } from '../../interfaces/product.interface';

const request = supertest(app);

const Products: ProductStore = new ProductStore();
describe('Test Products controller', () => {
  beforeAll(async () => {
    const product1: Product = {
      name: 'Cheetos',
      price: 5,
      category: 'Food',
    };
    const product2: Product = {
      name: 'Moro',
      price: 10,
      category: 'Food',
    };
    const product3: Product = {
      name: 'Pepsi',
      price: 6,
      category: 'Food',
    };
    const product4: Product = {
      name: 'laptop',
      price: 2000,
      category: 'Electornics',
    };
    const product5: Product = {
      name: 'Mobile',
      price: 1000,
      category: 'Electornics',
    };
    await Products.create(product1);
    await Products.create(product2);
    await Products.create(product3);
    await Products.create(product4);
    await Products.create(product5);
  });

  it('get all products method', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  it('get product method', async () => {
    const response = await request.get('/products/3');
    expect(response.status).toBe(200);
  });

  it('Create product with wrong data', async () => {
    const response = await request
      .post('/products/create')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        name: 'Handfree',
        category: 'Electornics',
      });

    expect(response.status).toBe(400);
  });
  it('Create product with correct data', async () => {
    const response = await request
      .post('/products/create')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        name: 'Mobile',
        price: 1000,
        category: 'Electornics',
      });

    expect(response.status).toBe(200);
  });

  it('update product data ', async () => {
    const response = await request
      .put('/products/edit')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        id: 4,
        name: 'laptop',
        price: 1500,
        category: 'Electornics',
      });
    expect(response.status).toBe(200);
  });

  it('delete Product data ', async () => {
    const response = await request
      .delete('/products/4')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      );
    expect(response.status).toBe(200);
  });
  it('get to five Products data ', async () => {
    const response = await request
      .get('/products/topfive')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      );
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const conn = await Client.connect();
    const sql = `TRUNCATE TABLE products CASCADE;`;
    await conn.query(sql);
    await conn.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1;`);
    conn.release();
  });
});
