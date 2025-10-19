import request from 'supertest';

import { App } from 'supertest/types';

import app, { dbConfig, initDatabase, pool } from '../src/app';

beforeAll(async () => {
  await initDatabase(dbConfig);
});

afterAll(async () => {
  if (pool) await pool.end();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });

  it('should login and return accessToken + refresh cookie', async () => {
    const name = 'Test User';
    const email = `login${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({ name, email, password: 'test1234' });

    const res = await request(app).post('/api/auth/login').send({ email, password: 'test1234' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');

    const cookies = res.get('Set-Cookie');
    expect(cookies).toBeDefined();
    expect(cookies?.some((c: string) => c.startsWith('refreshToken='))).toBeTruthy();
  });

  it('should access protected route with valid token', async () => {
    const name = 'Test User';

    const email = `secure${Date.now()}@example.com`;
    await request(app).post('/api/auth/register').send({ name, email, password: 'securepass' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'securepass' });

    const token = loginRes.body.accessToken;

    const protectedRes = await request(app)
      .get('/api/test')
      .set('Authorization', `Bearer ${token}`);

    expect(protectedRes.status).toBe(200);
    expect(protectedRes.body).toHaveProperty('email', email);
  });
});
