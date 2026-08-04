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

jest.mock('@Pimcore/app/i18n', () => ({
  __esModule: true,
  default: { t: (key: string) => key }
}))

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
