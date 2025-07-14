const express = require('express');
const passport = require('passport');

const router = express.Router();
const pkg = require('../../package.json');
// Use bearer auth strategy for all /v1 routes
router.use('/v1', passport.authenticate('bearer', { session: false }), require('./api'));

// Optional root route for quick checks
// router.get('/', (req, res) => {
//   res.setHeader('Cache-Control', 'no-cache');
//   res.status(200).json({ status: 'ok', message: 'Welcome to Fragments API' });
// });
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  const cleanRepoUrl = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, ''); // 🔧 clean URL
  res.status(200).json({
    status: 'ok',
    author: pkg.author,
    githubUrl: cleanRepoUrl, // ✅ use cleaned URL
    version: pkg.version,
  });
});

module.exports = router;
