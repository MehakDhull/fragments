// src/routes/api/post.js
const { Fragment } = require('../../model/Frag');

const createFragment = async (req, res) => {
  const contentType = req.get('Content-Type');
  const validTypes = ['application/json', 'text/plain', 'text/markdown', 'text/html', 'text/css'];

  if (!validTypes.includes(contentType)) {
    return res.status(415).json({ status: 'error', message: 'Unsupported content type' });
  }

  try {
    const fragment = new Fragment({ ownerId: req.user, type: contentType });
    await fragment.setData(req.body);
    await fragment.save();
    res.status(201).location(`/v1/fragments/${fragment.id}`).json({ status: 'ok', fragment });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = { createFragment };
