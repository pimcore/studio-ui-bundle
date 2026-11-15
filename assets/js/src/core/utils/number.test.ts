/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    language: 'en',
    format: jest.fn()
  }
}))

// eslint-disable-next-line import/first
import i18n from 'i18next'
// eslint-disable-next-line import/first
import { getDecimalSeparator } from './number'

const setLanguage = (lng: string): void => {
  (i18n as unknown as { language: string }).language = lng
}

describe('getDecimalSeparator', () => {
  beforeEach(() => { setLanguage('en') })

  it('returns the comma for locales that use it', () => {
    expect(getDecimalSeparator('de')).toBe(',')
    expect(getDecimalSeparator('fr')).toBe(',')
    expect(getDecimalSeparator('it')).toBe(',')
  })

  it('returns the dot for locales that use it', () => {
    expect(getDecimalSeparator('en')).toBe('.')
    expect(getDecimalSeparator('en-US')).toBe('.')
  })

  it('normalises underscore locale tags (Pimcore stores de_DE, Intl needs de-DE)', () => {
    expect(getDecimalSeparator('de_DE')).toBe(',')
    expect(getDecimalSeparator('de_AT')).toBe(',')
  })

  it('falls back to the UI language when no locale is passed', () => {
    setLanguage('de')
    expect(getDecimalSeparator()).toBe(',')

    setLanguage('en')
    expect(getDecimalSeparator()).toBe('.')
  })

  it('falls back to the dot for unusable locale tags instead of throwing', () => {
    expect(getDecimalSeparator('not a tag')).toBe('.')
    expect(getDecimalSeparator('')).toBe('.')

    setLanguage('')
    expect(getDecimalSeparator()).toBe('.')
  })
})
