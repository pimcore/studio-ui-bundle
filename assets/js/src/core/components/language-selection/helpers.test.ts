/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isLanguageIndependentValueAllowed } from './helpers'

describe('isLanguageIndependentValueAllowed', () => {
  it('allows it when no language permission is configured', () => {
    expect(isLanguageIndependentValueAllowed(null)).toBe(true)
    expect(isLanguageIndependentValueAllowed(undefined)).toBe(true)
  })

  it('allows it for an empty permission string', () => {
    expect(isLanguageIndependentValueAllowed('')).toBe(true)
  })

  it('allows it when it is the only configured permission', () => {
    expect(isLanguageIndependentValueAllowed('default')).toBe(true)
  })

  it('allows it when it is configured next to concrete languages', () => {
    expect(isLanguageIndependentValueAllowed('de,default,en')).toBe(true)
  })

  it('denies it when the configured language list leaves it out', () => {
    expect(isLanguageIndependentValueAllowed('de,en')).toBe(false)
  })
})
