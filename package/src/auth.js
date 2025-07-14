const logger = require('./logger');
const passport = require('passport');

const isTestEnv = process.env.NODE_ENV === 'test';
const useBasicAuth = process.env.HTPASSWD_FILE || isTestEnv;
const useCognitoAuth = process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID;

if (useBasicAuth && useCognitoAuth && !isTestEnv) {
  throw new Error('Both Cognito and Basic Auth are configured. Only one should be.');
}

if (useBasicAuth) {
  logger.info('Using HTTP Basic Auth strategy');
  const basic = require('./auth/basic-auth');
  module.exports = {
    strategy: () => passport.use('basic', basic.strategy()),
    authenticate: basic.authenticate,
  };
} else if (useCognitoAuth) {
  logger.info('Using AWS Cognito strategy');
  const cognito = require('./auth/cognito');
  module.exports = {
    strategy: () => passport.use('bearer', cognito.strategy()),
    authenticate: cognito.authenticate,
  };
} else {
  throw new Error('No valid authentication strategy is configured.');
}
