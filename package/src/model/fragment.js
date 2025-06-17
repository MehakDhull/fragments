// src/model/fragment.js

const { readFragment, writeFragment, readFragmentData, writeFragmentData } = require('./data');
const crypto = require('crypto');
const mime = require('mime-types');

class Fragment {
  constructor({ id, ownerId, created = new Date(), updated = new Date(), type, size = 0 }) {
    if (!ownerId || !type) {
      throw new Error('ownerId and type are required');
    }

    if (!Fragment.isSupportedType(type)) {
      throw new Error(`Unsupported content type: ${type}`);
    }

    this.id = id || crypto.randomUUID();
    this.ownerId = ownerId;
    this.created = new Date(created);
    this.updated = new Date(updated);
    this.type = type;
    this.size = size;
  }

  static types = ['text/plain'];

  static isSupportedType(value) {
    return Fragment.types.includes(value);
  }

  static mimeTypeIsText(type) {
    return type.startsWith('text/');
  }

  static async byId(ownerId, id) {
    const data = await readFragment(ownerId, id);
    return data ? new Fragment(data) : null;
  }

  static async list(ownerId) {
    return await readFragment(ownerId);
  }

  async save() {
    this.updated = new Date();
    await writeFragment(this.ownerId, this);
  }

  async setData(data) {
    if (!Buffer.isBuffer(data)) {
      throw new Error('data must be a Buffer');
    }

    this.size = data.length;
    await writeFragmentData(this.ownerId, this.id, data);
    await this.save();
  }

  async getData() {
    return await readFragmentData(this.ownerId, this.id);
  }

  get mimeType() {
    return this.type.split(';')[0];
  }

  get extension() {
    return mime.extension(this.mimeType);
  }
}

module.exports = Fragment;
