import request from 'supertest';

import app from '../../../src/app';

describe('POST /api/auth/refresh', () => {
  it('should fail without cookie', async () => {
    const res = await request(app).post('/api/auth/refresh');
    expect(res.status).toBe(401);
  });

  it('should return a new access token', async () => {
    const email = `refresh${Date.now()}@test.com`;

    const register = await request(app).post('/api/auth/register').send({
      name: 'Test',
      email,
      password: 'password123',
    });

    const cookies = register.headers['set-cookie'];
    const res = await request(app).post('/api/auth/refresh').set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
