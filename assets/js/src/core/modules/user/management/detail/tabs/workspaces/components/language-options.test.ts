/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildLanguagePermissionOptions } from './language-options'

describe('buildLanguagePermissionOptions', () => {
  const getDisplayName = (language: string): string | undefined => ({
    de: 'German',
    en: 'English',
    fr: 'French'
  })[language]

  it('offers the language independent value as the first option', () => {
    const options = buildLanguagePermissionOptions(['fr', 'de', 'en'], getDisplayName, 'default')

    expect(options[0]).toEqual({ value: 'default', label: 'default' })
  })

  it('sorts the remaining languages by their display name', () => {
    const options = buildLanguagePermissionOptions(['fr', 'de', 'en'], getDisplayName, 'default')

    expect(options.slice(1)).toEqual([
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' }
    ])
  })

  it('falls back to the language code when there is no display name', () => {
    const options = buildLanguagePermissionOptions(['xx'], getDisplayName, 'default')

    expect(options.slice(1)).toEqual([{ value: 'xx', label: 'xx' }])
  })

  it('does not offer the language independent value twice', () => {
    const options = buildLanguagePermissionOptions(['default', 'de'], getDisplayName, 'default')

    expect(options.filter((option) => option.value === 'default')).toHaveLength(1)
  })
})
