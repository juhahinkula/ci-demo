import { describe, test } from '@jest/globals';
import request from 'supertest';
import app from './app';

describe('Calculator API', () => {
  test('GET / should return status message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Calculator API is running');
  });

  test('POST /calculate should add two numbers', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ operation: 'add', a: 5, b: 3 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result', 8);
  });

  test('POST /calculate should subtract two numbers', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ operation: 'subtract', a: 5, b: 3 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result', 3);
  });

  test('POST /calculate should return error for invalid operation', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ operation: 'invalid', a: 5, b: 3 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid operation');
  });

  test('POST /calculate should return error when dividing by zero', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ operation: 'divide', a: 5, b: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Division by zero');
  });
});
