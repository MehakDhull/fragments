const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const authConnect = require('./authConnect');
const basic = require('./basic');
const logger = require('../logger');

// Initialize and configure the basic strategy
passport.use(new BasicStrategy(authConnect(basic)));

logger.info('Basic authentication strategy initialized');

// Use custom authorize middleware instead of passport.authenticate directly
const authorize = require('./auth-middleware');

module.exports.authenticate = () => authorize('basic');
