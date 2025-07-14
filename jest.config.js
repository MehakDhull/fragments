// jest.config.js

// Get the full path to our .env.test file
const path = require('path');
const envFile = path.join(__dirname, '.env.test'); // Correct file path for .env.test

// Load environment variables from the .env.test file
require('dotenv').config({ path: envFile });

// Log a message to remind developers how to see more detail from log messages
console.log(`Using LOG_LEVEL=${process.env.LOG_LEVEL}. Use 'debug' in .env.test for more detail`);

// Set our Jest options
module.exports = {
  verbose: true,
  testTimeout: 5000,
};
