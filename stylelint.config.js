module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    indentation: 2,
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null
  }
}