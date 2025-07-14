

const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const logger = require('../logger');

// We expect AWS_COGNITO_POOL_ID and AWS_COGNITO_CLIENT_ID to be defined
if (!(process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID)) {
  throw new Error('Missing expected env vars: AWS_COGNITO_POOL_ID, AWS_COGNITO_CLIENT_ID');
}

// Log that we're using Cognito
logger.info('Using AWS Cognito for auth');

// Create a Cognito JWT Verifier to validate the token
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
  tokenUse: 'id', // Expecting an Identity Token
});

// At startup, download and cache JWKS keys for verification
jwtVerifier
  .hydrate()
  .then(() => {
    logger.info('Cognito JWKS cached');
  })
  .catch((err) => {
    logger.error({ err }, 'Unable to cache Cognito JWKS');
  });

// Define the Passport Bearer strategy
module.exports.strategy = () =>
  new BearerStrategy(async (token, done) => {
    try {
      // Verify the JWT token
      const user = await jwtVerifier.verify(token);
      logger.debug({ user }, 'Verified user token');

      // Use user's email as their ID in the system
      done(null, user.email);
    } catch (err) {
      logger.error({ err, token }, 'Could not verify token');
      done(null, false); // Not authenticated
    }
  });

module.exports.authenticate = () => passport.authenticate('bearer', { session: false });
