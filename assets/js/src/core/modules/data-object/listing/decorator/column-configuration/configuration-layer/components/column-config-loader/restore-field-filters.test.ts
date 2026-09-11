/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { restoreFieldFilters } from './restore-field-filters'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

const availableColumns = [
  { key: 'name', type: 'input' },
  { key: 'price', type: 'numeric' }
] as unknown as AvailableColumn[]

describe('restoreFieldFilters', () => {
  it('rebuilds field filters from a saved grid configuration filter', () => {
    const restored = restoreFieldFilters({
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [
        { key: 'name', type: 'metadata.object', filterValue: 'foo', locale: 'en', meta: { translationKey: 'Name' } }
      ]
    } as any, availableColumns)

    expect(restored).toEqual([
      { key: 'name', type: 'input', filterValue: 'foo', locale: 'en', meta: { translationKey: 'Name' } }
    ])
  })

  it('falls back to the column key as translation key when meta is missing', () => {
    const restored = restoreFieldFilters({
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'price', type: 'numeric.metadata', filterValue: 10 }]
    } as any, availableColumns)

    expect(restored).toEqual([
      { key: 'price', type: 'numeric', filterValue: 10, locale: null, meta: { translationKey: 'price' } }
    ])
  })

  it('drops saved filters whose column no longer exists', () => {
    const restored = restoreFieldFilters({
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'removed-column', type: 'input', filterValue: 'foo' }]
    } as any, availableColumns)

    expect(restored).toEqual([])
  })

  it('returns an empty array when the backend never persisted a filter (empty array response)', () => {
    expect(restoreFieldFilters([] as any, availableColumns)).toEqual([])
  })

  it('returns an empty array when no filter was saved with the configuration', () => {
    expect(restoreFieldFilters(undefined, availableColumns)).toEqual([])
  })
})
