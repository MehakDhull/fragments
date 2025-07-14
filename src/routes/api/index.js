const express = require('express');
const router = express.Router();

const post = require('./post');
const get = require('./get');
const getId = require('./get-id');
const getIdInfo = require('./get-id-info');
const getIdExt = require('./get-id-ext');
const authenticate = require('../../middleware/auth');
router.use(authenticate);
router.post('/fragments', post.createFragment);
router.get('/fragments', get.getFragments);
router.get('/fragments/:id', getId.getFragmentById);
router.get('/fragments/:id/info', getIdInfo.getFragmentInfo);
router.get('/fragments/:id.:ext', getIdExt.convertFragment);

module.exports = router;
