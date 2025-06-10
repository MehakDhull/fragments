// tests/unit/fragment.test.js

const Fragment = require('../../src/model/fragment');

describe('Fragment class', () => {
  const ownerId = 'user@example.com';

  test('constructor sets fields correctly', () => {
    const fragment = new Fragment({ ownerId, type: 'text/plain' });
    expect(fragment.ownerId).toBe(ownerId);
    expect(fragment.type).toBe('text/plain');
    expect(fragment.size).toBe(0);
    expect(fragment.id).toBeDefined();
  });

  test('throws error if required fields are missing', () => {
    expect(() => new Fragment({ type: 'text/plain' })).toThrow();
    expect(() => new Fragment({ ownerId })).toThrow();
  });

  test('throws error for unsupported type', () => {
    expect(() => new Fragment({ ownerId, type: 'application/json' })).toThrow();
  });

  test('Fragment.isSupportedType()', () => {
    expect(Fragment.isSupportedType('text/plain')).toBe(true);
    expect(Fragment.isSupportedType('application/json')).toBe(false);
  });

  test('can save and get by id', async () => {
    const fragment = new Fragment({ ownerId, type: 'text/plain' });
    await fragment.save();
    const found = await Fragment.byId(ownerId, fragment.id);
    expect(found).toEqual(expect.any(Fragment));
    expect(found.id).toBe(fragment.id);
  });

  test('can set and get data', async () => {
    const fragment = new Fragment({ ownerId, type: 'text/plain' });
    const buffer = Buffer.from('hello world');
    await fragment.setData(buffer);
    const data = await fragment.getData();
    expect(data.toString()).toBe('hello world');
    expect(fragment.size).toBe(buffer.length);
  });

  test('get extension and mimeType', () => {
    const fragment = new Fragment({ ownerId, type: 'text/plain' });
    expect(fragment.mimeType).toBe('text/plain');
    expect(fragment.extension).toBe('txt');
  });
});
