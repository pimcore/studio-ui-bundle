/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

module.exports = {
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js', './**/*.ts']
    }
  ],
  plugins: [
    'header'
  ],
  rules: {
    'header/header': [2, 'block', [
      '*',
      '* Pimcore',
      '*',
      '* This source file is available under two different licenses:',
      '* - Pimcore Open Core License (POCL)',
      '* - Pimcore Commercial License (PCL)',
      '* Full copyright and license information is available in',
      '* LICENSE.md which is distributed with this source code.',
      ''
    ], 2]
  }
}
