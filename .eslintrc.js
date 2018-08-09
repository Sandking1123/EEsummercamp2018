module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'semistandard',
    'plugin:vue/recommended'
  ], 
  plugins: [
    'vue'
  ],
  rules: {
    'arrow-parens': 'off',
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/html-self-closing': 0,
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': [2, { singleline: 5 }],
    'vue/name-property-casing': [2, 'kebab-case'],
    'vue/attributes-order': [2, {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'UNIQUE',
        'BINDING',
        'EVENTS',
        'CONTENT',
        'GLOBAL',
        'OTHER_ATTR'
      ]
    }],
    'vue/order-in-components': [2, {
      order: [
        'el',
        'name',
        ['template', 'render', 'renderError'],
        ['parent','functional', 'delimiters', 'comments'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'methods',
        'LIFECYCLE_HOOKS',
        'watch',
        ['directives', 'filters'],
        'components'
      ]
    }]
  },
  globals: {
    document: true
  },
};
