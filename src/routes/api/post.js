// src/routes/api/post.js
const { createSuccessResponse } = require('../../response');

module.exports = (req, res) => {
  const text = req.body;
  if (!text) {
    return res.status(400).json({ status: 'error', message: 'No content provided' });
  }

  // Return mock success for now
  res.status(201).json(createSuccessResponse({
    fragment: {
      id: Date.now().toString(),
      type: req.headers['content-type'],
      size: Buffer.byteLength(text),
    },
  }));
};
