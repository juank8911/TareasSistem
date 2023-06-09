const request = require('supertest');
const app = require('../../server');

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password' });
      
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password' });
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
