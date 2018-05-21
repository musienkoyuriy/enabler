module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'prefer-promise-reject-errors': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': 'error'
  },
  plugins: [
    'prettier'
  ],
  env: {
    'es6': true,
    'node': true
  }
};
