/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { formatMultiValueFilter, parseMultiValueFilter, resolveEditedMultiValueFilter } from './multi-value-filter'

describe('parseMultiValueFilter', () => {
  it('keeps a single-line text as the text it is', () => {
    expect(parseMultiValueFilter('auto-3095')).toBe('auto-3095')
    expect(parseMultiValueFilter('Hello, World')).toBe('Hello, World')
    expect(parseMultiValueFilter('a;b')).toBe('a;b')
  })

  it('ignores line breaks around a single value', () => {
    expect(parseMultiValueFilter('A-1\n')).toBe('A-1')
    expect(parseMultiValueFilter('\r\n  A-1  \r\n')).toBe('A-1')
  })

  it('splits a pasted list on line breaks', () => {
    expect(parseMultiValueFilter('A-1\nB-2\nC-3')).toEqual(['A-1', 'B-2', 'C-3'])
    expect(parseMultiValueFilter('A-1\r\nB-2\r\n')).toEqual(['A-1', 'B-2'])
  })

  it('also splits a list on tabs, commas and semicolons once it spans several lines', () => {
    expect(parseMultiValueFilter('A-1, B-2;C-3\tD-4\nE-5')).toEqual(['A-1', 'B-2', 'C-3', 'D-4', 'E-5'])
  })

  it('keeps spaces inside a value', () => {
    expect(parseMultiValueFilter('Red car\nBlue car')).toEqual(['Red car', 'Blue car'])
  })

  it('trims, drops empty entries and removes duplicates keeping the first occurrence', () => {
    expect(parseMultiValueFilter(' A-1 \n\n B-2\nA-1\n  \nB-2')).toEqual(['A-1', 'B-2'])
  })

  it('keeps case, because the match is exact', () => {
    expect(parseMultiValueFilter('a-1\nA-1')).toEqual(['a-1', 'A-1'])
  })
})

describe('formatMultiValueFilter', () => {
  it('shows a text as it is', () => {
    expect(formatMultiValueFilter('A-1')).toBe('A-1')
    expect(formatMultiValueFilter('A-1\nB-2')).toBe('A-1\nB-2')
  })

  it('shows a restored list one value per line', () => {
    expect(formatMultiValueFilter(['A-1', 'B-2'])).toBe('A-1\nB-2')
    expect(formatMultiValueFilter(['A-1'])).toBe('A-1')
  })

  it('shows nothing for anything else', () => {
    expect(formatMultiValueFilter(undefined)).toBe('')
    expect(formatMultiValueFilter(null)).toBe('')
    expect(formatMultiValueFilter(5)).toBe('')
  })
})

describe('resolveEditedMultiValueFilter', () => {
  it('hands back an untouched restored list as it was, also a single-value one', () => {
    const list = ['A-1', 'B-2']
    const singleton = ['A-1']

    expect(resolveEditedMultiValueFilter('A-1\nB-2', list)).toBe(list)
    expect(resolveEditedMultiValueFilter('A-1', singleton)).toBe(singleton)
  })

  it('hands back the text once it was edited', () => {
    expect(resolveEditedMultiValueFilter('A-1\nB-2\nC-3', ['A-1', 'B-2'])).toBe('A-1\nB-2\nC-3')
    expect(resolveEditedMultiValueFilter('', ['A-1'])).toBe('')
  })

  it('hands back the text when there was no list', () => {
    expect(resolveEditedMultiValueFilter('A-1', 'A-1')).toBe('A-1')
    expect(resolveEditedMultiValueFilter('A-1', undefined)).toBe('A-1')
  })
})
