import request from 'supertest';

import app from '../../../src/app';

describe('GET /api/me', () => {
  it('should return current user', async () => {
    const email = `me${Date.now()}@test.com`;

    const register = await request(app).post('/api/auth/register').send({
      name: 'Test',
      email,
      password: 'password123',
    });

    const token = register.body.accessToken;

    const res = await request(app).get('/api/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });
});
