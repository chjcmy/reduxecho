module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-boolean-value': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    camelcase: 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    radix: 0,
    strict: 0,
    'prefer-destructuring': 0,
    'no-shadow': 0,
    'consistent-return': 0,
    'import/order': 0,
    'no-const-assign': 0,
    'react/destructuring-assignment': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'react/jsx-no-undef': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'linebreak-style': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-one-expression-per-line': 0,
    'func-names': 0
  }
};
