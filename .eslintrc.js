module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', 'plugin:promise/recommended', 'plugin:storybook/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-indent': ['error', 4],
    'indent': ['error', 4],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    // Reasoning behind using dangling commas -> https://github.com/airbnb/javascript#commas--dangling
    'eqeqeq': ['error', 'smart'],
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true
    }],
    'space-before-function-paren': ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never'
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'beside'
    }],
    'vue/no-setup-props-destructure': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'promise/always-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  env: {
    'vue/setup-compiler-macros': true,
    'node': true
  }
};