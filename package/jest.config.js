const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'env.jest') });

process.env.NODE_ENV = 'test';

console.log(`Using LOG_LEVEL=${process.env.LOG_LEVEL}`);
console.log(`HTPASSWD_FILE=${process.env.HTPASSWD_FILE}`);
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

module.exports = {
  verbose: true,
  testTimeout: 5000,
};
