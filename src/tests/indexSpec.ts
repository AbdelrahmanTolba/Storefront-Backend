import supertest from 'supertest';
import config from '../config';
import app from '../index';

const request = supertest(app);

describe('Test endpoint of server', () => {
  it('Get endpoint (/)', async () => {
    console.log(config.database);
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/users)', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/products)', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/orders)', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
  });
});
