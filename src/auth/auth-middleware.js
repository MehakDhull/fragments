const passport = require('passport');
const { createErrorResponse } = require('../response');
const hash = require('../hash');
const logger = require('../logger');

/**
 * Custom middleware for authenticating and hashing user email
 * @param {'bearer' | 'http'} strategyName - the passport strategy to use
 * @returns {Function} Express middleware function
 */
module.exports = (strategyName) => {
  return function (req, res, next) {
    /**
     * Callback run after authentication to handle result and hash the email
     * @param {Error|null} err
     * @param {string|object|null} user
     */
    function callback(err, user) {
      if (err) {
        logger.error({ err }, 'Unexpected error during authentication');
        return next(createErrorResponse(500, 'Internal Server Error during authentication'));
      }

      if (!user) {
        logger.warn('Unauthorized access attempt - no user returned');
        return res.status(401).json(createErrorResponse(401, 'Unauthorized'));
      }

      // Hash the user's email and attach it to req.user
      if (typeof user === 'string') {
        req.user = {
          email: user,
          emailHash: hash(user),
        };
        logger.debug(
          { email: user, hashed: req.user.emailHash },
          'Basic strategy user authenticated and hashed'
        );
      } else if (typeof user === 'object' && user.email) {
        req.user = {
          ...user,
          emailHash: hash(user.email),
        };
        logger.debug(
          { email: user.email, hashed: req.user.emailHash },
          'Bearer strategy user authenticated and hashed'
        );
      } else {
        logger.error({ user }, 'Authenticated user object is invalid or missing email');
        return next(createErrorResponse(500, 'Authenticated user object invalid'));
      }

      logger.info({ emailHash: req.user.emailHash }, 'User authentication complete');
      next();
    }

    // Trigger passport strategy with our custom callback
    passport.authenticate(strategyName, { session: false }, callback)(req, res, next);
  };
};
