const { v4: uuidv4 } = require('uuid');

class Fragment {
  constructor({ ownerId, type, content }) {
    this.id = uuidv4();
    this.ownerId = ownerId;
    this.type = type;
    this.created = new Date();
    this.updated = new Date();
    this.content = content;
  }
}

module.exports = Fragment;
