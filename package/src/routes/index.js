const express = require('express');
const router = express.Router();
const { author, version } = require('../../package.json');
const { createSuccessResponse } = require('../response');

router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(
    createSuccessResponse({
      author,
      githubUrl: 'https://github.com/khmahida/fragments',
      version,
    })
  );
});


const { authenticate } = require('../auth');
router.use('/v1', authenticate(), require('./api'));


module.exports = router;
