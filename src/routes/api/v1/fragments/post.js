
const Fragment = require('../../../../model/fragment');
const contentType = require('content-type');


module.exports = async (req, res) => {
  if (!Buffer.isBuffer(req.body)) {
    return res.status(415).json({ error: 'Unsupported content type' });
  }

  const { type } = contentType.parse(req);
  if (!Fragment.isSupportedType(type)) {
    return res.status(415).json({ error: 'Unsupported content type' });
  }

  const fragment = new Fragment({ ownerId: req.user, type });
  await fragment.setData(req.body);

  const baseUrl = process.env.API_URL || `http://${req.headers.host}`;
  res.setHeader('Location', `${baseUrl}/v1/fragments/${fragment.id}`);
  res.status(201).json(fragment);
};
