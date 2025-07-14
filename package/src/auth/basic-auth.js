const auth = require('http-auth');
const passport = require('passport');
const logger = require('../logger');
const authPassport = require('http-auth-passport');

// if (!process.env.HTPASSWD_FILE) {
//   throw new Error('missing expected env var: HTPASSWD_FILE');
// }

logger.info('Using HTTP Basic Auth for auth');

const basic = auth.basic({
  file: process.env.HTPASSWD_FILE,
});

function registerBasicStrategy() {
  logger.debug('Registering Basic Auth strategy...');
  return authPassport(basic); 
}

function authenticateBasic() {
  return passport.authenticate('basic', { session: false });
}

module.exports = {
  strategy: registerBasicStrategy,   
  authenticate: authenticateBasic,
};
