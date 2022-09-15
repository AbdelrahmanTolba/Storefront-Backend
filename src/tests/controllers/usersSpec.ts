import { User } from './../../interfaces/user.interface';
import { UserStore } from './../../models/users';
import supertest from 'supertest';
import app from '../../index';
import Client from '../../database';
import { getToken } from '../../controllers/tokens';

const request = supertest(app);

const Users: UserStore = new UserStore();
describe('Test Users controller', () => {
  beforeAll(async () => {
    const user1: User = {
      email: 'abdelrahman@gmail.com',
      firstname: 'Abdelrahman',
      lastname: 'Tolba',
      password: 'password123',
    };
    const user2: User = {
      email: 'hossamkhalifa@gmail.com',
      firstname: 'Hossam',
      lastname: 'Khalifa',
      password: 'password123',
    };
    const user3: User = {
      email: 'eyad@gmail.com',
      firstname: 'Eyad',
      lastname: 'Tolba',
      password: 'password123',
    };
    const user4: User = {
      email: 'mahmoud@gmail.com',
      firstname: 'Mahmoud',
      lastname: 'Tolba',
      password: 'password123',
    };
    const user5: User = {
      email: 'Ahmed@gmail.com',
      firstname: 'Ahmed',
      lastname: 'Amer',
      password: 'password123',
    };
    await Users.create(user1);
    await Users.create(user2);
    await Users.create(user3);
    await Users.create(user4);
    await Users.create(user5);
  });

  it('get all users method', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${getToken('testing data')}`);
    expect(response.status).toBe(200);
  });

  it('get user method', async () => {
    const response = await request
      .get('/users/3')
      .set('Authorization', `Bearer ${getToken('testing data')}`);
    expect(response.status).toBe(200);
  });

  it('Create data with wrong data', async () => {
    const response = await request.post('/users/create').send({
      email: 'hamada@yahoo.com',
      firstname: 'hamada',
      password: 'password12345',
    });

    expect(response.status).toBe(400);
  });
  it('Create data with correct data', async () => {
    const response = await request.post('/users/create').send({
      email: 'hamada@yahoo.com',
      firstname: 'hamada',
      lastname: 'hamoda',
      password: 'password12345',
    });

    expect(response.status).toBe(200);
  });

  it('update user data ', async () => {
    const response = await request
      .put('/users/edit')
      .set('Authorization', `Bearer ${getToken('testing data')}`)
      .send({
        id: 4,
        email: 'mahmoud@gmail.com',
        firstname: 'Mahmoud5',
        lastname: 'Tolba5',
      });
    expect(response.status).toBe(200);
  });

  it('delete user data ', async () => {
    const response = await request
      .delete('/users/4')
      .set('Authorization', `Bearer ${getToken('testing data')}`);
    expect(response.status).toBe(200);
  });

  it('login successfully ', async () => {
    const response = await request.post('/login').send({
      email: 'hamada@yahoo.com',
      password: 'password12345',
    });
    expect(response.status).toBe(200);
  });
  it('authanticated user ', async () => {
    const response = await request.post('/auth').send({
      email: 'hamada@yahoo.com',
      password: 'password12345',
    });
    expect(response.status).toBe(200);
  });
  it('logout', async () => {
    const response = await request.post('/logout');
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const conn = await Client.connect();

    await conn.query(`TRUNCATE TABLE users CASCADE;`);
    await conn.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);
    conn.release();
  });
});
