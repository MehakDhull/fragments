const hashEmail = require('../../src/hash');

describe('hashEmail', () => {
  test('should return a SHA-256 hash of the email', () => {
    const email = 'user@example.com';
    const hashed = hashEmail(email);
    expect(typeof hashed).toBe('string');
    expect(hashed.length).toBe(64); // SHA-256 in hex is 64 characters
  });

  test('same input should return the same hash', () => {
    const email = 'user@example.com';
    expect(hashEmail(email)).toBe(hashEmail(email));
  });

  test('different input returns different hash', () => {
    expect(hashEmail('user1@example.com')).not.toBe(hashEmail('user2@example.com'));
  });
});
