/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getHiddenKeyIds } from './hide-empty-data'

const key = (id: number, definition: object = {}): { id: number, definition: object } => ({ id, definition })

describe('getHiddenKeyIds', () => {
  it('hides keys without a value', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1), key(2)],
      groupValue: { 1: 'filled' }
    })

    expect(Array.from(hidden)).toEqual([2])
  })

  it('hides keys whose value is empty', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1), key(2), key(3), key(4), key(5)],
      groupValue: {
        1: null,
        2: '',
        3: '   ',
        4: {},
        5: []
      }
    })

    expect(Array.from(hidden)).toEqual([1, 2, 3, 4, 5])
  })

  it('keeps falsy values that are actual data', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1), key(2)],
      groupValue: {
        1: 0,
        2: false
      }
    })

    expect(hidden.size).toBe(0)
  })

  it('keeps keys with a structured value', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1)],
      groupValue: { 1: { value: '196', unitId: 'mm' } }
    })

    expect(hidden.size).toBe(0)
  })

  it('never hides a mandatory key', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1, { mandatory: true }), key(2, { mandatory: false })],
      groupValue: {}
    })

    expect(Array.from(hidden)).toEqual([2])
  })

  it('hides every non-mandatory key when the group has no value at all', () => {
    const hidden = getHiddenKeyIds({
      keys: [key(1), key(2, { mandatory: true })],
      groupValue: undefined
    })

    expect(Array.from(hidden)).toEqual([1])
  })

  it('treats a key without a definition as optional', () => {
    const hidden = getHiddenKeyIds({
      keys: [{ id: 1 }],
      groupValue: {}
    })

    expect(Array.from(hidden)).toEqual([1])
  })

  it('returns an empty set for an empty key list', () => {
    expect(getHiddenKeyIds({ keys: [], groupValue: { 1: 'filled' } }).size).toBe(0)
  })
})
