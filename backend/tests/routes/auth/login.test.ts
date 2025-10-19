import request from 'supertest';

import app from '../../../src/app';

describe('POST /api/auth/login', () => {
  it('should fail if user does not exist', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'unknown@test.com',
      password: 'password',
    });

    expect(res.status).toBe(404);
  });

  it('should fail with wrong password', async () => {
    const email = `login${Date.now()}@test.com`;

    await request(app).post('/api/auth/register').send({
      name: 'Test',
      email,
      password: 'correctPassword',
    });

    const res = await request(app).post('/api/auth/login').send({
      email,
      password: 'wrongPassword',
    });

    expect(res.status).toBe(401);
  });

  it('should login and set refresh cookie', async () => {
    const email = `login${Date.now()}@test.com`;

    await request(app).post('/api/auth/register').send({
      name: 'Test',
      email,
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email,
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();

    const cookies = res.get('Set-Cookie');
    expect(cookies?.some((c: string) => c.includes('refreshToken'))).toBe(true);
  });
});
