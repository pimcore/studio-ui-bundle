/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isLanguageEditable, isLanguageIndependentValueAllowed, resolveAllowedLanguages } from './helpers'

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

describe('resolveAllowedLanguages', () => {
  const contentLanguages = ['en', 'de', 'fr']

  it('keeps every content language when no permission is configured', () => {
    expect(resolveAllowedLanguages(null, contentLanguages)).toEqual(contentLanguages)
    expect(resolveAllowedLanguages(undefined, contentLanguages)).toEqual(contentLanguages)
    expect(resolveAllowedLanguages('', contentLanguages)).toEqual(contentLanguages)
  })

  it('keeps every content language when only the language independent value is configured', () => {
    expect(resolveAllowedLanguages('default', contentLanguages)).toEqual(contentLanguages)
  })

  it('narrows to the configured languages', () => {
    expect(resolveAllowedLanguages('en,de', contentLanguages)).toEqual(['en', 'de'])
    expect(resolveAllowedLanguages('de', contentLanguages)).toEqual(['de'])
  })

  it('ignores the language independent value when concrete languages are configured', () => {
    expect(resolveAllowedLanguages('default,de', contentLanguages)).toEqual(['de'])
  })

  it('ignores configured languages the user has no content language for', () => {
    expect(resolveAllowedLanguages('de,es', contentLanguages)).toEqual(['de'])
  })

  it('preserves the content language order rather than the permission order', () => {
    expect(resolveAllowedLanguages('fr,en', contentLanguages)).toEqual(['en', 'fr'])
  })
})

describe('isLanguageEditable', () => {
  it('allows any language when no permission is configured', () => {
    expect(isLanguageEditable(null, 'en')).toBe(true)
    expect(isLanguageEditable(undefined, 'en')).toBe(true)
    expect(isLanguageEditable('', 'en')).toBe(true)
  })

  it('allows any language when only the language independent value is configured', () => {
    expect(isLanguageEditable('default', 'en')).toBe(true)
  })

  it('allows a configured language', () => {
    expect(isLanguageEditable('de,en', 'en')).toBe(true)
    expect(isLanguageEditable('default,de', 'de')).toBe(true)
  })

  /**
   * The reported case: view en+de, edit de only - en must not be editable.
   */
  it('denies a language the permission leaves out', () => {
    expect(isLanguageEditable('de', 'en')).toBe(false)
    expect(isLanguageEditable('default,de', 'en')).toBe(false)
  })
})
