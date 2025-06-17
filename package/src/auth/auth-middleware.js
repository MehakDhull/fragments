// src/auth/auth-middleware.js

const passport = require('passport');
const hash = require('../hash');

// Custom middleware to wrap the default passport.authenticate()
// and also hash the user ID before passing to downstream handlers
module.exports = (strategy) => [
  passport.authenticate(strategy, { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        error: { message: 'unauthorized', code: 401 },
      });
    }
    req.user = hash(req.user);
    next();
  },
];
