module.exports = {
  extends: 'semistandard',
  rules: {
    'arrow-parens': 'off',
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  },
  globals: {
    document: true
  },
};
