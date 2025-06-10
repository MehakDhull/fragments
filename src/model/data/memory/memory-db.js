const memory = {};

function getFragmentOwnerStore(ownerId) {
  if (!memory[ownerId]) {
    memory[ownerId] = {};
  }
  return memory[ownerId];
}

async function readFragment(ownerId, id) {
  const store = getFragmentOwnerStore(ownerId);
  return id ? store[id]?.metadata : Object.keys(store);
}

async function writeFragment(ownerId, fragment) {
  const store = getFragmentOwnerStore(ownerId);
  if (!store[fragment.id]) {
    store[fragment.id] = {};
  }
  store[fragment.id].metadata = fragment;
}

async function readFragmentData(ownerId, id) {
  const store = getFragmentOwnerStore(ownerId);
  return store[id]?.data || null;
}

async function writeFragmentData(ownerId, id, data) {
  const store = getFragmentOwnerStore(ownerId);
  if (!store[id]) {
    store[id] = {};
  }
  store[id].data = data;
}
function clear() {
  for (const ownerId in memory) {
    delete memory[ownerId];
  }
}

module.exports = {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  clear,
};
