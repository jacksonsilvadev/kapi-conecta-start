module.exports = {
  extends: 'airbnb-base',
  rules: {
    'global-require': 0,
    'comma-dangle': 0,
    'padded-blocks': 0,
    'import/order': 0,
    'object-curly-newline': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-unused-expressions': 'off',
        'no-undef': 'off'
      }
    }
  ]
};
