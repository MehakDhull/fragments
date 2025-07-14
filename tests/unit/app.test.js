const request = require('supertest');
const app = require('../../src/app');

describe('App-level behaviors', () => {
  test('responds with 404 for unknown routes', async () => {
    const res = await request(app).get('/some/unknown/route');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      status: 'error',
      error: {
        message: 'not found',
        code: 404,
      },
    });
  });
});
