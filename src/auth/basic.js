// src/auth/basic.js

const auth = require('http-auth');
const bcrypt = require('bcrypt');
const path = require('path');
const logger = require('../logger');

// Load users from .htpasswd file in tests folder
const basic = auth.basic(
  {
    realm: 'User Area',
    file: path.join(__dirname, '../../tests/.htpasswd'),
  },
  (username, password, callback) => {
    const storedPasswordHash = basic.users[username];
    if (!storedPasswordHash) {
      logger.warn(`User ${username} not found`);
      return callback(false);
    }
    console.log('Checking password:', { username, password, storedPasswordHash });

    bcrypt.compare(password, storedPasswordHash, (err, result) => {
      if (err) {
        logger.error({ err }, 'Error comparing password');
        return callback(false);
      }
      callback(result);
    });
  }
);

module.exports = basic;
