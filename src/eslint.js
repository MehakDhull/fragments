// // eslint.config.js
// // import js from '@eslint/js';
// const js = require('@eslint/js');
// export default [
//   js.configs.recommended,
//   {
//     languageOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'commonjs',
//     },
//     rules: {
//       'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
//     },
//   },
// ];
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
