// tests/unit/hash.test.js

const hash = require('../../src/hash');

describe('hash()', () => {
  test('produces a hash of input string', () => {
    const hashed = hash('test@example.com');
    expect(typeof hashed).toBe('string');
    expect(hashed).toHaveLength(64); // SHA-256 hash length
  });

  test('hashes consistently for same input', () => {
    const a = hash('hello');
    const b = hash('hello');
    expect(a).toBe(b);
  });

  test('different input yields different hash', () => {
    const a = hash('one');
    const b = hash('two');
    expect(a).not.toBe(b);
  });
});
