const { createSuccessResponse } = require('../../response');

module.exports = async (req, res) => {
  // Just for testing, respond with success
  res.status(201).json(
    createSuccessResponse({
      fragment: {
        id: 'mock-id',
        type: 'text/plain',
        size: req.body.length,
      },
    })
  );
};

