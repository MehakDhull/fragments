const express = require('express');
const passport = require('passport');
const logger = require('./logger');
const pino = require('pino-http')({ logger }); // <--- this line was crashing
require('./auth');
const routes = require('./routes');
const { createErrorResponse } = require('./response');

const app = express();

app.use(pino);
app.use(express.json());
app.use(passport.initialize());

app.use('/', routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json(createErrorResponse(404, 'not found'));
});

// Error Handler
app.use((err, req, res) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json(createErrorResponse(500, err.message));
});

module.exports = app;
