const express = require('express');

const router = express.Router();
router.get('/fragments', require('./get'));
router.get('/fragments', require('./post'));

module.exports = router;
