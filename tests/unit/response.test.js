const { createSuccessResponse, createErrorResponse } = require('../../src/response');

describe('API Responses', () => {
  test('createSuccessResponse()', () => {
    const result = createSuccessResponse();
    expect(result).toEqual({ status: 'ok' });
  });

  test('createSuccessResponse(data)', () => {
    const result = createSuccessResponse({ user: 'Mehak' });
    expect(result).toEqual({ status: 'ok', user: 'Mehak' });
  });

  test('createErrorResponse()', () => {
    const result = createErrorResponse(404, 'not found');
    expect(result).toEqual({
      status: 'error',
      error: {
        code: 404,
        message: 'not found',
      },
    });
  });

  test('createSuccessResponse with user 1', () => {
    const result = createSuccessResponse({ user: 'user1' });
    expect(result).toEqual({ status: 'ok', user: 'user1' });
  });

  test('createSuccessResponse with multiple fields', () => {
    const result = createSuccessResponse({ user: 'Sam', age: 30 });
    expect(result).toEqual({ status: 'ok', user: 'Sam', age: 30 });
  });

  test('createErrorResponse with 400 code', () => {
    const result = createErrorResponse(400, 'Bad Request');
    expect(result).toEqual({
      status: 'error',
      error: { code: 400, message: 'Bad Request' },
    });
  });

  test('createErrorResponse with 500 code', () => {
    const result = createErrorResponse(500, 'Server Error');
    expect(result).toEqual({
      status: 'error',
      error: { code: 500, message: 'Server Error' },
    });
  });

  test('createSuccessResponse with boolean value', () => {
    const result = createSuccessResponse({ success: true });
    expect(result).toEqual({ status: 'ok', success: true });
  });

  test('createErrorResponse with empty message', () => {
    const result = createErrorResponse(400, '');
    expect(result).toEqual({
      status: 'error',
      error: { code: 400, message: '' },
    });
  });

  test('createSuccessResponse with array data', () => {
    const result = createSuccessResponse({ items: [1, 2, 3] });
    expect(result).toEqual({ status: 'ok', items: [1, 2, 3] });
  });

  test('createSuccessResponse with null data', () => {
    const result = createSuccessResponse({ value: null });
    expect(result).toEqual({ status: 'ok', value: null });
  });

  test('createErrorResponse with custom message', () => {
    const result = createErrorResponse(403, 'Access Denied');
    expect(result).toEqual({
      status: 'error',
      error: { code: 403, message: 'Access Denied' },
    });
  });

  test('createSuccessResponse with numeric field', () => {
    const result = createSuccessResponse({ count: 42 });
    expect(result).toEqual({ status: 'ok', count: 42 });
  });

  test('createSuccessResponse with stringified number', () => {
    const result = createSuccessResponse({ total: '100' });
    expect(result).toEqual({ status: 'ok', total: '100' });
  });

  test('createErrorResponse with 401 code', () => {
    const result = createErrorResponse(401, 'Unauthorized');
    expect(result).toEqual({
      status: 'error',
      error: { code: 401, message: 'Unauthorized' },
    });
  });

  test('createSuccessResponse with empty object', () => {
    const result = createSuccessResponse({});
    expect(result).toEqual({ status: 'ok' });
  });

  test('createSuccessResponse with boolean false', () => {
    const result = createSuccessResponse({ active: false });
    expect(result).toEqual({ status: 'ok', active: false });
  });

  test('createSuccessResponse with null payload', () => {
    const result = createSuccessResponse(null);
    expect(result).toEqual({ status: 'ok' });
  });

  test('createSuccessResponse with multiple key types', () => {
    const result = createSuccessResponse({ a: 1, b: 'text', c: true });
    expect(result).toEqual({ status: 'ok', a: 1, b: 'text', c: true });
  });

  test('createErrorResponse with negative code', () => {
    const result = createErrorResponse(-1, 'Negative code');
    expect(result).toEqual({
      status: 'error',
      error: { code: -1, message: 'Negative code' },
    });
  });

  test('createErrorResponse with large code', () => {
    const result = createErrorResponse(9999, 'Huge code');
    expect(result).toEqual({
      status: 'error',
      error: { code: 9999, message: 'Huge code' },
    });
  });

  test('createSuccessResponse with string payload', () => {
    const result = createSuccessResponse({ data: 'hello' });
    expect(result).toEqual({ status: 'ok', data: 'hello' });
  });

  test('createSuccessResponse with nested boolean', () => {
    const result = createSuccessResponse({ config: { enabled: false } });
    expect(result).toEqual({ status: 'ok', config: { enabled: false } });
  });

  test('createSuccessResponse with deep object', () => {
    const result = createSuccessResponse({ user: { profile: { id: 1 } } });
    expect(result).toEqual({ status: 'ok', user: { profile: { id: 1 } } });
  });

  test('createErrorResponse with long message', () => {
    const msg = 'a'.repeat(100);
    const result = createErrorResponse(500, msg);
    expect(result).toEqual({
      status: 'error',
      error: { code: 500, message: msg },
    });
  });
//aaa
  test('createErrorResponse with null message', () => {
    const result = createErrorResponse(400, null);
    expect(result).toEqual({
      status: 'error',
      error: { code: 400, message: null },
    });
  });
});
