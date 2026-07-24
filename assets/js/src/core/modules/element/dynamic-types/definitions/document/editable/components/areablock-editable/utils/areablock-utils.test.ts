/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { areablockValueUtils } from './areablock-utils'
import { type AreablockValue } from '../areablock-editable'

const value: AreablockValue = [
  { key: '5', type: 'hero-teaser', hidden: false },
  { key: '2', type: 'standard-teaser', hidden: false },
  { key: '12', type: 'hero-grid', hidden: false }
]

describe('areablockValueUtils', () => {
  describe('getEntryIndexByKey', () => {
    it('finds the entry position by key', () => {
      expect(areablockValueUtils.getEntryIndexByKey(value, '2')).toBe(1)
    })

    it('matches numeric keys against string keys', () => {
      const numericValue: AreablockValue = [{ key: 12, type: 'hero-grid', hidden: false }]
      expect(areablockValueUtils.getEntryIndexByKey(numericValue, '12')).toBe(0)
    })

    it('returns -1 for an unknown key', () => {
      expect(areablockValueUtils.getEntryIndexByKey(value, '99')).toBe(-1)
    })
  })

  describe('insertEntry', () => {
    it('inserts the entry at the given position without mutating the input', () => {
      const entry = { key: '13', type: 'wysiwyg', hidden: false }

      const result = areablockValueUtils.insertEntry(value, 1, entry)

      expect(result.map(item => item.key)).toEqual(['5', '13', '2', '12'])
      expect(value).toHaveLength(3)
    })
  })

  describe('removeEntryByKey', () => {
    it('removes the entry with the given key without mutating the input', () => {
      const result = areablockValueUtils.removeEntryByKey(value, '2')

      expect(result.map(item => item.key)).toEqual(['5', '12'])
      expect(value).toHaveLength(3)
    })
  })

  describe('moveEntry', () => {
    it('moves an entry to the target position', () => {
      expect(areablockValueUtils.moveEntry(value, 0, 2).map(item => item.key)).toEqual(['2', '12', '5'])
      expect(areablockValueUtils.moveEntry(value, 2, 0).map(item => item.key)).toEqual(['12', '5', '2'])
    })
  })

  describe('setEntryHidden', () => {
    it('updates the hidden flag of the entry with the given key', () => {
      const result = areablockValueUtils.setEntryHidden(value, '12', true)

      expect(result[2]).toEqual({ key: '12', type: 'hero-grid', hidden: true })
      expect(value[2].hidden).toBe(false)
    })
  })

  describe('calculateNextKey', () => {
    it('allocates above the highest key of the authoritative value', () => {
      expect(areablockValueUtils.calculateNextKey(value, [])).toBe(13)
    })

    it('never collides with server keys when the DOM entries are unkeyed', () => {
      expect(areablockValueUtils.calculateNextKey(value, [null, null, null])).toBe(13)
    })

    it('considers DOM keys that are higher than the value keys', () => {
      expect(areablockValueUtils.calculateNextKey(value, ['20'])).toBe(21)
    })

    it('starts at 1 for an empty areablock', () => {
      expect(areablockValueUtils.calculateNextKey([], [])).toBe(1)
    })
  })
})
