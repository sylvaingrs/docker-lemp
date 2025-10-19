import request from 'supertest';

import app from '../../../src/app';

describe('GET /api/auth/verify', () => {
  it('should reject without token', async () => {
    const res = await request(app).get('/api/auth/verify');
    expect(res.status).toBe(401);
  });

  it('should accept valid token', async () => {
    const email = `verify${Date.now()}@test.com`;

    const register = await request(app).post('/api/auth/register').send({
      name: 'Test',
      email,
      password: 'password123',
    });

    const token = register.body.accessToken;

    const res = await request(app).get('/api/auth/verify').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.authenticated).toBe(true);
  });
});
