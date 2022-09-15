import supertest from 'supertest';
import app from '../index';
import { getToken } from '../controllers/tokens';

const request = supertest(app);

describe('Test endpoint of server', () => {
  it('Get endpoint (/)', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/users)', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${getToken('testing data')}`);
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/products)', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('Get endpoint (/orders)', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${getToken('testing data')}`);
    expect(response.status).toBe(200);
  });
});
