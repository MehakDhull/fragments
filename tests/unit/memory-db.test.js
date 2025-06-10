// tests/unit/memory-db.test.js

const memory = require('../../src/model/data/memory/memory-db');

describe('memory-db', () => {
  beforeEach(() => memory.clear());

  test('can store and retrieve data', async () => {
    const fakeFragment = { id: 'abc', ownerId: 'user1', type: 'text/plain' };
    await memory.writeFragment('user1', fakeFragment);
    const result = await memory.readFragment('user1', 'abc');
    expect(result).toEqual(fakeFragment);
  });

  test('returns undefined for missing key', async () => {
    const result = await memory.readFragment('user1', 'nonexistent');
    expect(result).toBeUndefined();
  });

  test('can delete data', async () => {
    const fakeFragment = { id: 'deltest', ownerId: 'user1', type: 'text/plain' };
    await memory.writeFragment('user1', fakeFragment);
    memory.clear();
    const result = await memory.readFragment('user1', 'deltest');
    expect(result).toBeUndefined();
  });

  test('can list keys', async () => {
    const fragA = { id: 'a', ownerId: 'user1', type: 'text/plain' };
    const fragB = { id: 'b', ownerId: 'user1', type: 'text/plain' };
    await memory.writeFragment('user1', fragA);
    await memory.writeFragment('user1', fragB);
    const result = await memory.readFragment('user1');
    expect(result).toEqual(expect.arrayContaining(['a', 'b']));
  });
});
