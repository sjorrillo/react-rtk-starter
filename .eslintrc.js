module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'jest/globals': true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'jest', 'jest-dom', 'prettier'],
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
  rules: {
    'no-restricted-imports': [
      'error', {
        paths: [{
          'name': 'lodash',
          'message': "Please use `import <package> from 'lodash/<package>';` instead"
        }]
      }
    ],
    camelcase: [
      2,
      {
        allow: [], // add alowed variables
      },
    ],
    'no-use-before-define': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-empty-function': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-bitwise': 0,
    'no-unused-vars': 0,
    'no-else-return': ['error'],
    'no-extend-native': ['error'],
    'no-lonely-if': ['error'],
    'no-multi-str': ['error'],
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-return-assign': ['error'],
    'no-shadow': 0,
    'no-useless-escape': 0,
    'prefer-template': 2,
    'prefer-rest-params': 2,
    'prefer-object-spread': ['error'],
    'prefer-arrow-callback': ['error'],
    'prefer-regex-literals': 0,
    quotes: [2, 'single', 'avoid-escape'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['multiple', 'single', 'all', 'none'],
      },
    ],
    'yield-star-spacing': ['error', 'after'],
    'react/prefer-stateless-function': 0,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/boolean-prop-naming': ['error', { rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+' }],
    'react/display-name': 0,
    'react/jsx-equals-spacing': ['error'],
    'react/jsx-key': ['error'],
    'react/jsx-fragments': ['error'],
    'react/jsx-sort-props': [
      'error',
      {
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    'react/jsx-wrap-multilines': ['warn'],
    'react/sort-prop-types': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {
    document: true,
    jest: true,
    process: false,
    Promise: true,
    localStorage: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};