const { v4: uuidv4 } = require('uuid');
const fragments = {};

exports.saveFragment = (data, type) => {
  const id = uuidv4();
  fragments[id] = { id, type, data };
  return id;
};

exports.getFragment = (id) => fragments[id];
exports.getAllFragments = () => Object.values(fragments);
