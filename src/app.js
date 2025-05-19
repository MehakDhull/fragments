const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// author and version from our package.json file
const { author, version } = require('../package.json');

const logger = require('./logger');
const pino = require('pino-http')({ logger });

const app = express();

// Print the environment variables if LOG_LEVEL is 'debug'
if (process.env.LOG_LEVEL === 'debug') {
  console.log(process.env);
}

// Use pino logging middleware
app.use(pino);

// Use helmetjs security middleware
app.use(helmet());

// Use CORS middleware
app.use(cors());

// Use gzip/deflate compression middleware
app.use(compression());

/* 🔽🔽🔽 ADD THIS SECTION TO FIX THE STRATEGY ERROR 🔽🔽🔽 */
const passport = require('passport');
const auth = require('./auth');

passport.use(auth.strategy());      // Register "bearer" strategy
app.use(passport.initialize());     // Initialize Passport middleware
/* 🔼🔼🔼 END OF ADDITION 🔼🔼🔼 */

// Now load your routes AFTER passport is ready
app.use('/', require('./routes'));

// Define a simple health check route
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    status: 'ok',
    author,
    githubUrl: 'https://github.com/MehakDhull/fragments',
    version,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

module.exports = app;
