const express = require('express');

const router = express.Router();

const getHandler = require('./get');


router.get('/fragments', getHandler);


module.exports = router;
