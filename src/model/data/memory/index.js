const MemoryDB = require('./memory-db');

// Create two in-memory databases: one for fragment metadata and the other for raw data
const data = new MemoryDB();
const metadata = new MemoryDB();

function writeFragment(fragment) {
  const serialized = JSON.stringify(fragment);
  return metadata.put(fragment.ownerId, fragment.id, serialized);
}

async function readFragment(ownerId, id) {
  const serialized = await metadata.get(ownerId, id);
  return typeof serialized === 'string' ? JSON.parse(serialized) : serialized;
}

function writeFragmentData(ownerId, id, buffer) {
  return data.put(ownerId, id, buffer);
}

function readFragmentData(ownerId, id) {
  return data.get(ownerId, id);
}

async function listFragments(ownerId, expand = false) {
  const fragments = await metadata.query(ownerId);
  const parsed = fragments.map((f) => JSON.parse(f));
  return expand ? parsed : parsed.map((f) => f.id);
}

function deleteFragment(ownerId, id) {
  return Promise.all([metadata.del(ownerId, id), data.del(ownerId, id)]);
}

module.exports = {
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
  listFragments,
  deleteFragment,
};
