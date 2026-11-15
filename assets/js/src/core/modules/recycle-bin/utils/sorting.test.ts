/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DEFAULT_RECYCLE_BIN_SORT_FILTER, mapSortingToSortFilter } from './sorting'

describe('mapSortingToSortFilter', () => {
  it('falls back to the default sort filter when no column is sorted', () => {
    expect(mapSortingToSortFilter([])).toEqual(DEFAULT_RECYCLE_BIN_SORT_FILTER)
  })

  it('maps a known column id to its backend field name, ascending by default', () => {
    expect(mapSortingToSortFilter([{ id: 'path', desc: false }])).toEqual({
      key: 'path',
      direction: 'ASC'
    })
  })

  it('maps a descending sort to the DESC direction', () => {
    expect(mapSortingToSortFilter([{ id: 'amount', desc: true }])).toEqual({
      key: 'amount',
      direction: 'DESC'
    })
  })

  it('lowercases the multi-word deletedBy column id to the backend field name', () => {
    expect(mapSortingToSortFilter([{ id: 'deletedBy', desc: false }])).toEqual({
      key: 'deletedby',
      direction: 'ASC'
    })
  })

  it('falls back to the default sort filter for an unknown column id', () => {
    expect(mapSortingToSortFilter([{ id: 'unknown', desc: false }])).toEqual(DEFAULT_RECYCLE_BIN_SORT_FILTER)
  })

  it('only considers the first sorted column', () => {
    expect(mapSortingToSortFilter([{ id: 'type', desc: true }, { id: 'date', desc: false }])).toEqual({
      key: 'type',
      direction: 'DESC'
    })
  })
})
