module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'script',
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  globals: {
    process: 'readonly',
    console: 'readonly',
    __dirname: 'readonly',
    require: 'readonly',
    module: 'readonly',
  },
};
