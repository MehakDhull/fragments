// src/routes/api.js

const express = require('express');
const router = express.Router();

// Example protected route
router.get('/fragments', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'You have reached the protected /v1/fragments route',
  });
});

module.exports = router;
