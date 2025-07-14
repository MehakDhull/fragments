
const crypto = require('crypto');
const db = require('./data');

const supportedTypes = [
  'text/plain',
'text/markdown'];

class Fragment {
  constructor({ id, ownerId, type, size = 0, created = new Date(), updated = new Date() }) {
    if (!ownerId || !type || !Fragment.isSupportedType(type)) {
      throw new Error('Invalid fragment data');
    }
    this.id = id || crypto.randomUUID();
    this.ownerId = ownerId;
    this.type = type;
    this.size = size;
    this.created = created;
    this.updated = updated;
  }

  static isSupportedType(type) {
    return supportedTypes.includes(type);
  }

  static async byId(ownerId, id) {
    const data = await db.readFragment(ownerId, id);
    return data ? new Fragment(data) : null;
  }

  static async byUser(ownerId) {
    const items = await db.getFragments(ownerId);
    return items.map((data) => new Fragment(data));
  }

  async save() {
    this.updated = new Date();
    await db.writeFragment(this.ownerId, this);
  }

  async setData(buffer) {
    this.size = buffer.length;
    this.updated = new Date();
    await db.writeFragmentData(this.ownerId, this.id, buffer);
    await this.save();
  }

  async getData() {
    return db.readFragmentData(this.ownerId, this.id);
  }
}

module.exports = Fragment;
