const express = require('express');

const { authenticate } = require('../auth'); // if using auth

const router = express.Router();

// Mount API routes under /v1 and protect them
router.use('/v1', authenticate(), require('./api'));

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
