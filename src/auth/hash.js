// src/hash.js

const crypto = require('crypto');

module.exports = function hash(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
};
