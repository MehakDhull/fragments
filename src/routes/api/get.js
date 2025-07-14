const { Fragment } = require('../../model/Frag');

// module.exports = async (req, res) => {
//   try {
//     const expand = req.query.expand === '1';

//     const fragments = await Fragment.byUser(req.user, expand);

//     res.status(200).json({
//       status: 'ok',
//       fragments,
//     });
//   } catch (err) {
//     res.status(500).json({ status: 'error', message: err.message });
//   }
// };
// src/routes/api/get.js
exports.getFragments = async (req, res) => {
  try {
    const expand = req.query.expand === '1';
    const fragments = await Fragment.byUser(req.user, expand);
    res.status(200).json({
      status: 'ok',
      fragments,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
