const auth = require('http-auth');
const passport = require('passport');
const authPassport = require('http-auth-passport');
const logger = require('../logger');
const authorize = require('./auth-middleware');

// We expect a .htpasswd file path to be defined
if (!process.env.HTPASSWD_FILE) {
  throw new Error('missing expected env var: HTPASSWD_FILE');
}

logger.info('Using HTTP Basic Auth for auth');

module.exports.strategy = () =>
  authPassport(
    auth.basic({ file: process.env.HTPASSWD_FILE })
  );

module.exports.authenticate = () => passport.authenticate('http', { session: false });
module.exports.authenticate = () => authorize('http');