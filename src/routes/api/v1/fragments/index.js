const express = require('express');
const router = express.Router();
const contentType = require('content-type');
const Fragment = require('../../../../model/fragment');

const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      try {
        const { type } = contentType.parse(req);
        return Fragment.isSupportedType(type);
      } catch {
        return false;
      }
    },
  });

router.post('/', rawBody(), require('./post'));

module.exports = router;
