const express = require('express');
const stoppable = require('stoppable');
// const logger = require('./logger');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = parseInt(process.env.PORT || '8081', 10);

app.use(cors({
  origin: '*', 
  // origin: 'http://localhost:1234',  // Allow requests from the frontend (localhost:1234)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Location']  // Expose the Location header to the frontend
}));

// Body parser middleware
app.use(bodyParser.text({ type: 'text/plain' }));  // Handle plain text fragments
app.use(bodyParser.json());  // Handle JSON fragments
app.use(bodyParser.text({ type: 'text/markdown' })); // Handle markdown fragments

// POST endpoint to handle fragment creation
app.post('/create-fragment', (req, res) => {
  const content = req.body;  // Get content from the request body

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const createdFragment = {
    id: Date.now(),
    content: content,
    type: req.headers['content-type'],  // Get fragment type from header
    message: 'Fragment created successfully',
  };

  console.log('Created Fragment:', createdFragment);

  // Set the Location header to the URL of the newly created fragment
  const locationUrl = `/fragments/${createdFragment.id}`;
  console.log(`Setting Location header to: ${locationUrl}`);
  res.set('Location', locationUrl);  // Add the Location header

  res.status(201).json(createdFragment);  // Send back the created fragment with the Location header
});

// Start the server
const server = stoppable(app.listen(port, () => {
  console.log(`Server started on port ${port}`);
}));

module.exports = server;
