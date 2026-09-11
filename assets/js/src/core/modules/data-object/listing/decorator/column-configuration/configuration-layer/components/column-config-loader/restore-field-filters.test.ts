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
import { type GridFilter } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

const availableColumns = [
  { key: 'name', type: 'input' },
  { key: 'price', type: 'numeric' },
  { key: 'select-field', type: 'select', config: { filters: { key: 'apiKeyOverride' } } },
  { key: 'unresolved-config-field', type: 'input', config: false }
] as unknown as AvailableColumn[]

describe('restoreFieldFilters', () => {
  it('rebuilds field filters from a saved grid configuration filter', () => {
    const savedFilter: GridFilter = {
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [
        { key: 'name', type: 'metadata.object', filterValue: 'foo', locale: 'en', meta: { translationKey: 'Name' } }
      ]
    }

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([
      { key: 'name', type: 'input', filterValue: 'foo', locale: 'en', meta: { translationKey: 'Name' } }
    ])
  })

  it('falls back to the column key as translation key when meta is missing', () => {
    const savedFilter: GridFilter = {
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'price', type: 'numeric.metadata', filterValue: 10 }]
    }

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([
      { key: 'price', type: 'numeric', filterValue: 10, locale: null, meta: { translationKey: 'price' } }
    ])
  })

  it('drops saved filters whose column no longer exists', () => {
    const savedFilter: GridFilter = {
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'removed-column', type: 'input', filterValue: 'foo' }]
    }

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([])
  })

  it('resolves a column by its configured filter-key override and restores the UI column key', () => {
    const savedFilter: GridFilter = {
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'apiKeyOverride', type: 'select', filterValue: 'foo' }]
    }

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([
      { key: 'select-field', type: 'select', filterValue: 'foo', locale: null, meta: { translationKey: 'select-field' } }
    ])
  })

  it('does not throw when a column config was serialized as false', () => {
    const savedFilter: GridFilter = {
      page: 1,
      pageSize: 0,
      includeDescendants: false,
      columnFilters: [{ key: 'unresolved-config-field', type: 'input', filterValue: 'foo' }]
    }

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([
      { key: 'unresolved-config-field', type: 'input', filterValue: 'foo', locale: null, meta: { translationKey: 'unresolved-config-field' } }
    ])
  })

  it('returns an empty array when the backend never persisted a filter (empty array response)', () => {
    const savedFilter: GridFilter[] = []

    expect(restoreFieldFilters(savedFilter, availableColumns)).toEqual([])
  })

  it('returns an empty array when no filter was saved with the configuration', () => {
    expect(restoreFieldFilters(undefined, availableColumns)).toEqual([])
  })
})
