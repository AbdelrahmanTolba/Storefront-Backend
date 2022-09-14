import { OrderStore } from './../../models/orders';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../index';
import config from '../../config';
import Client from '../../database';
import { UserStore } from '../../models/users';
import { ProductStore } from '../../models/products';
import { Product } from '../../interfaces/product.interface';
import { Order } from '../../interfaces/order.interface';
import { User } from '../../interfaces/user.interface';

const request = supertest(app);

const Orders: OrderStore = new OrderStore();
describe('Test Orders controller', () => {
  const UsersOrders: UserStore = new UserStore();
  const ProductsOrders: ProductStore = new ProductStore();
  let userId: number, productId: number;
  beforeAll(async () => {
    const NewUser_orders: User = {
      email: 'hesham@gmail.com',
      firstname: 'Hesham ',
      lastname: 'Ali',
      password: 'password321',
    };

    const user = await UsersOrders.create(NewUser_orders);
    userId = user.id as unknown as number;
    const NewProduct_orders: Product = {
      name: 'cat',
      price: 200,
      category: 'animals',
    };
    const product = await ProductsOrders.create(NewProduct_orders);
    productId = product.id as unknown as number;

    const order1: Order = {
      product_id: productId,
      user_id: userId,
      quantity: 2,
      status: 'active',
    };
    const order2: Order = {
      product_id: productId,
      user_id: userId,
      quantity: 4,
      status: 'complete',
    };
    console.log(order2);

    await Orders.create(order1);
    await Orders.create(order2);
  });

  it('get all orders method', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });
  it('get order', async () => {
    const response = await request.get('/orders/2');
    expect(response.status).toBe(200);
  });

  it('get order by user id ', async () => {
    const response = await request
      .get('/orders/userorders/1')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      );
    expect(response.status).toBe(200);
  });

  it('Create order with wrong data', async () => {
    const response = await request
      .post('/orders/create')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        product_id: productId,
        quantity: 1,
        status: 'active',
      });

    expect(response.status).toBe(400);
  });
  it('Create order with correct data', async () => {
    const response = await request
      .post('/orders/create')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        product_id: productId,
        user_id: userId,
        quantity: 1,
        status: 'active',
      });

    expect(response.status).toBe(200);
  });

  it('update order data ', async () => {
    const response = await request
      .put('/orders/edit')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      )
      .send({
        id: 2,
        product_id: productId,
        user_id: userId,
        quantity: 4,
        status: 'complete',
      });
    expect(response.status).toBe(200);
  });

  it('delete order data ', async () => {
    const response = await request
      .delete('/orders/2')
      .set(
        'Authorization',
        `Bearer ${jwt.sign('testing data', `${config.tokenSecret}`)}`
      );
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const conn = await Client.connect();
    await conn.query(`TRUNCATE TABLE orders CASCADE;`);
    await conn.query(`TRUNCATE TABLE users CASCADE;`);
    await conn.query(`TRUNCATE TABLE products CASCADE;`);
    await conn.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    await conn.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1;`);

    conn.release();
  });
});
