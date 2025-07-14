const express = require('express');
const passport = require('passport');
const app = express();
const response = require('./response');
const auth = require('./auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


auth.strategy(); 

app.use(passport.initialize());

// Routes
app.use('/', require('./routes'));
app.use((req, res) => {
  res.status(404).json(response.createErrorResponse(404, 'not found'));
});

// Error handler
app.use((err, req, res,) => {
  console.error('Uncaught error:', err);
  res.status(500).json(response.createErrorResponse(500, err.message));
});

module.exports = app;
