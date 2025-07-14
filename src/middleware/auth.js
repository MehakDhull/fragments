// src/middleware/auth.js
const passport = require('passport');

let authenticate;

// If running in test mode, skip authentication
if (process.env.NODE_ENV === 'test') {
  console.log('[auth] Skipping authentication middleware for test');
  authenticate = (req, res, next) => next();
} else {
  // In other environments, use the Cognito strategy
  require('../auth/cognito');
  authenticate = passport.authenticate('bearer', { session: false });
}

module.exports = authenticate;
