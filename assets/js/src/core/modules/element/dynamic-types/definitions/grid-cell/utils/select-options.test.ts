/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { convertSelectOptions, normalizeSelectValue, stringifyOptionValue } from './select-options'

// Real i18next instance with the app's separator config (keySeparator: false, default nsSeparator ':')
// so namespace parsing of option keys is exercised.
jest.mock('@Pimcore/app/i18n', () => {
  const instance = jest.requireActual('i18next').createInstance()
  void instance.init({
    lng: 'en',
    ns: ['translation'],
    keySeparator: false,
    initAsync: false,
    resources: { en: { translation: { 'TYPE:A': 'Type A' } } }
  })

  return { __esModule: true, default: instance }
})

describe('convertSelectOptions', () => {
  it('returns undefined for nil options', () => {
    expect(convertSelectOptions(undefined)).toBeUndefined()
    expect(convertSelectOptions(null)).toBeUndefined()
  })

  it('coerces numeric provider values to string so antd strict comparison matches (#3322)', () => {
    expect(convertSelectOptions([{ key: 'One', value: 1 }])).toEqual([
      { label: 'One', value: '1' }
    ])
  })

  it('keeps string values as-is and maps the key to a label', () => {
    expect(convertSelectOptions([{ key: 'A', value: 'a' }, { key: 'B', value: 'b' }])).toEqual([
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' }
    ])
  })

  it('keeps option keys containing a colon intact instead of parsing a namespace (platform-version#461)', () => {
    expect(convertSelectOptions([
      { key: '08:00', value: '08:00' },
      { key: '16:9', value: '16:9' },
      { key: 'studio:08:00', value: 'x' }
    ])).toEqual([
      { label: '08:00', value: '08:00' },
      { label: '16:9', value: '16:9' },
      { label: 'studio:08:00', value: 'x' }
    ])
  })

  it('translates option keys containing a colon as a whole key', () => {
    expect(convertSelectOptions([{ key: 'TYPE:A', value: 'a' }])).toEqual([
      { label: 'Type A', value: 'a' }
    ])
  })
})

describe('normalizeSelectValue', () => {
  it('maps nil values to undefined', () => {
    expect(normalizeSelectValue(null)).toBeUndefined()
    expect(normalizeSelectValue(undefined)).toBeUndefined()
  })

  it('coerces a scalar value to string', () => {
    expect(normalizeSelectValue(5)).toBe('5')
  })

  it('coerces each item of an array value to string', () => {
    expect(normalizeSelectValue([1, 2, 'c'])).toEqual(['1', '2', 'c'])
  })
})

describe('stringifyOptionValue', () => {
  it('returns undefined for nil and a string otherwise', () => {
    expect(stringifyOptionValue(undefined)).toBeUndefined()
    expect(stringifyOptionValue(null)).toBeUndefined()
    expect(stringifyOptionValue(1)).toBe('1')
    expect(stringifyOptionValue('a')).toBe('a')
  })
})
