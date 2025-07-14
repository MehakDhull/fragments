const {
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
  listFragments,
  deleteFragment,
} = require('../../src/model/data/memory');

const testFragment = {
  id: 'frag1',
  ownerId: 'user1',
  type: 'text/plain',
  size: 100,
};

describe('memory data model', () => {
  test('writeFragment() and readFragment() store and retrieve metadata', async () => {
    await writeFragment(testFragment);
    const result = await readFragment('user1', 'frag1');
    expect(result).toEqual(testFragment);
  });

  test('writeFragmentData() and readFragmentData() store and retrieve data', async () => {
    const data = Buffer.from('Hello world');
    await writeFragmentData('user1', 'frag1', data);
    const result = await readFragmentData('user1', 'frag1');
    expect(result).toEqual(data);
  });

  test('listFragments() returns ids by default', async () => {
    await writeFragment(testFragment);
    const ids = await listFragments('user1');
    expect(ids).toEqual(['frag1']);
  });

  test('listFragments(true) returns full objects', async () => {
    await writeFragment(testFragment);
    const result = await listFragments('user1', true);
    expect(result).toEqual([testFragment]);
  });

  test('deleteFragment() removes both metadata and data', async () => {
    await writeFragment(testFragment);
    await writeFragmentData('user1', 'frag1', Buffer.from('test'));

    await deleteFragment('user1', 'frag1');

    const meta = await readFragment('user1', 'frag1');
    const data = await readFragmentData('user1', 'frag1');

    expect(meta).toBeUndefined();
    expect(data).toBeUndefined();
  });
});
