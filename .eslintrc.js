// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // 关闭缩进的报错
    'indent': 'off',
    // 关闭键值之间空格的报错
    'key-spacing': 'off',
    // 逗号后空格的报错
    'comma-spacing': 'off',
    // 单双引号的额报错
    'quotes': 'off',
    // 块级代码前的空格
    'space-before-blocks': 'off',
    // function名和参数括号之间的空格
    'space-before-function-paren': 'off',
    // 关键词 如：if 后面的空格
    'keyword-spacing': 'off',
    // 句末分号
    'semi': 'off',
    // 标签内的空行
    'no-trailing-spaces': 'off',
    // 数组中的空格
    'array-bracket-even-spacing': 'off',
    // 块级结尾的空格
    'comma-dangle': 'off',
    // 等号后的空格
    'space-infix-ops': 'off',
    // 块级中的空行
    'padded-blocks': 'off',
    // 多余的空行
    'no-multiple-empty-lines': 'off',
    // 注释后的空格
    'spaced-comment': 'off',
    // 缩进
    'no-tabs': 'off',
    // 空格代替tab
    'no-irregular-whitespace': 'off',
    // 双等于
    'eqeqeq': 'off',
    // 文件最后的空行
    'eol-last ': 'off'
    // 重复定义的键名
    // 'no-dupe-keys': 'off'

  }
}
