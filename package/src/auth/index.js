
const logger = require('../logger');

const isTestEnv = process.env.NODE_ENV === 'test';
const useBasicAuth = process.env.HTPASSWD_FILE || isTestEnv;
const useCognitoAuth = process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID;

if (useBasicAuth && useCognitoAuth && !isTestEnv) {
  throw new Error('Both Cognito and Basic Auth are configured. Only one should be.');
}

if (useBasicAuth) {
  logger.info('Using HTTP Basic Auth strategy');
  const basic = require('./basic-auth');
  module.exports.authenticate = basic.authenticate;
} else if (useCognitoAuth) {
  logger.info('Using AWS Cognito strategy');
  const cognito = require('./cognito');
  module.exports.authenticate = cognito.authenticate;
} else {
  throw new Error('No valid authentication strategy is configured.');
}
