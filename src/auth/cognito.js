const passport = require('passport');
const { BearerStrategy } = require('passport-azure-ad');
const authorize = require('./auth-middleware');
const logger = require('../logger');

// ✅ Check early: if test mode, skip real Cognito config
if (process.env.NODE_ENV === 'test') {
  console.log('[auth] Skipping Cognito strategy during test');

  // Export dummy middleware so app can proceed without auth during tests
  module.exports = {
    authenticate: () => (req, res, next) => next(),
  };

  // ❌ NO `return` here — it's not valid outside a function
} else {
  // ✅ Real Cognito setup ONLY in non-test environments
  const options = {
    identityMetadata: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_POOL_ID}/.well-known/openid_configuration`,
    clientID: "7isffc9d0krf4ebvf4bu2uslvs",
    // process.env.AWS_COGNITO_CLIENT_ID,
    audience: process.env.COGNITO_APP_CLIENT_ID,
    validateIssuer: true,
    loggingLevel: 'info',
    passReqToCallback: false,
  };

  passport.use(
    new BearerStrategy(options, (token, done) => {
      logger.debug({ token }, 'Decoded token from Cognito');
      const email = token.email || token.username || token.sub;
      return done(null, { email });
    })
  );

  module.exports.authenticate = () => authorize('bearer');
}
