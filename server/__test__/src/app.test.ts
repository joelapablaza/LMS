import request from 'supertest';
// import app from '../../src/app';
import app from '../../src/app';

describe('Get /health', () => {
  it('should return the string "Todo OK" with status 200', async () => {
    const expectedMessage = 'Todo OK';
    const status = 200;

    const response = await request(app).get('/health');

    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty('message', expectedMessage);
  });
});
