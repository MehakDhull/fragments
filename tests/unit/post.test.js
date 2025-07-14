// const request = require('supertest');
// const app = require('../../src/app');

// describe('POST /v1/fragments', () => {
//   test('unauthenticated requests are denied', async () => {
//     const res = await request(app).post('/v1/fragments');
//     expect(res.statusCode).toBe(401);
//   });
// });
// tests/unit/post.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { createFragment } = require('../../src/routes/api/post');

// Mock Fragment model
jest.mock('../../src/model/Frag', () => {
  return {
    Fragment: jest.fn().mockImplementation(() => ({
      setData: jest.fn().mockResolvedValue(),
      save: jest.fn().mockResolvedValue(),
      id: 'abc123',
    })),
  };
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text({ type: '*/*' })); // Allow text/plain, markdown, etc.
app.post('/v1/fragments', (req, res) => {
  // Inject fake authenticated user
  req.user = 'test-user@example.com';
  return createFragment(req, res);
});

describe('POST /v1/fragments', () => {
  test('should create fragment with application/json', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'application/json')
      .send({ key: 'value' });

    expect(res.status).toBe(201);
    expect(res.body.fragment).toBeDefined();
    expect(res.body.status).toBe('ok');
    expect(res.headers.location).toContain('/v1/fragments/');
  });

  test('should return 415 for unsupported content type', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'application/xml')
      .send('<xml>bad</xml>');

    expect(res.status).toBe(415);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toMatch(/unsupported/i);
  });

  test('should create fragment with text/plain', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'text/plain')
      .send('Simple text');

    expect(res.status).toBe(201);
    expect(res.body.fragment).toBeDefined();
  });

  test('should create fragment with text/markdown', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'text/markdown')
      .send('# Markdown content');

    expect(res.status).toBe(201);
    expect(res.body.fragment.id).toBe('abc123');
  });

  test('should create fragment with text/html', async () => {
    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'text/html')
      .send('<p>Hello</p>');

    expect(res.status).toBe(201);
  });
  test('should create fragment with text/css', async () => {
  const res = await request(app)
    .post('/v1/fragments')
    .set('Content-Type', 'text/css')
    .send('body { background: white; }');

  expect(res.status).toBe(201);
  expect(res.body.fragment).toBeDefined();
  expect(res.body.fragment.id).toBe('abc123');
});

test('should return 500 if save() throws after setData succeeds', async () => {
  const { Fragment } = require('../../src/model/Frag');
  Fragment.mockImplementation(() => ({
    setData: jest.fn().mockResolvedValue(),
    save: jest.fn().mockRejectedValue(new Error('save failed')),
    id: 'bad-save-123',
  }));

  const res = await request(app)
    .post('/v1/fragments')
    .set('Content-Type', 'application/json')
    .send({ key: 'value' });

  expect(res.status).toBe(500);
  expect(res.body.message).toMatch(/save failed/);
});

test('should reject request if Content-Type header is missing', async () => {
  const res = await request(app)
    .post('/v1/fragments')
    .send('no content type');

  expect(res.status).toBe(415);
  expect(res.body.message.toLowerCase()).toContain('unsupported');
});

  test('should return 500 if setData throws error', async () => {
    const { Fragment } = require('../../src/model/Frag');
    Fragment.mockImplementation(() => ({
      setData: jest.fn().mockRejectedValue(new Error('setData failed')),
      save: jest.fn(),
      id: 'bad123',
    }));

    const res = await request(app)
      .post('/v1/fragments')
      .set('Content-Type', 'application/json')
      .send({ key: 'broken' });

    expect(res.status).toBe(500);
    expect(res.body.message).toMatch(/setData failed/);
  });
});
