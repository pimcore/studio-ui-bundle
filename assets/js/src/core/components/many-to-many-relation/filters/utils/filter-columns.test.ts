/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import type { SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import type { DisplayManyToManyRelationValueItem } from '../../hooks/use-value'
import {
  buildVisibleFieldsMap,
  getDefaultRelationFilterColumns,
  getFilterColumnCandidates,
  resolveRowValue
} from './filter-columns'

const t = ((key: string) => key) as unknown as TFunction

const selectedColumns: Record<string, SelectedColumn> = {
  '{"key":"created"}': { key: 'created', type: 'dataobject.adapter', frontendType: 'date', config: { fieldDefinition: { fieldtype: 'date' } }, sortable: false, editable: false, localizable: false },
  '{"key":"name"}': { key: 'name', type: 'dataobject.adapter', frontendType: 'input', config: {}, sortable: false, editable: false, localizable: false }
}

const decodeColumn = (columnId: string): SelectedColumn | undefined => selectedColumns[columnId]

describe('getFilterColumnCandidates', () => {
  it('falls back to the columns of the relation grid itself', () => {
    expect(getFilterColumnCandidates(undefined, t)).toEqual(getDefaultRelationFilterColumns(t))
    expect(getDefaultRelationFilterColumns(t).map((column) => column.key)).toEqual(['id', 'fullPath', 'type', 'subtype'])
  })

  it('takes type, field type and config of a configured column from the column configuration', () => {
    const columnDefinition: Array<ColumnDef<any>> = [
      { id: '{"key":"created"}', header: 'Created' },
      { id: '{"key":"name"}', header: 'Name' }
    ]

    expect(getFilterColumnCandidates(columnDefinition, t, decodeColumn)).toEqual([
      { key: '{"key":"created"}', valueKey: 'created', title: 'Created', type: 'dataobject.adapter', frontendType: 'date', config: { fieldDefinition: { fieldtype: 'date' } } },
      { key: '{"key":"name"}', valueKey: 'name', title: 'Name', type: 'dataobject.adapter', frontendType: 'input', config: {} }
    ])
  })

  it('keeps the columns of the relation grid when they are rendered next to configured ones', () => {
    const columnDefinition: Array<ColumnDef<any>> = [
      { id: 'id', header: 'ID' },
      { id: '{"key":"name"}', header: 'Name' }
    ]

    expect(getFilterColumnCandidates(columnDefinition, t, decodeColumn).map((column) => column.valueKey)).toEqual(['id', 'name'])
  })

  it('skips the columns that carry grid controls and the unknown ones', () => {
    const columnDefinition: Array<ColumnDef<any>> = [
      { id: 'actions', header: 'Actions' },
      { id: 'selection', header: '' },
      { id: 'drag-handle', header: '' },
      { id: '{"key":"gone"}', header: 'Gone' }
    ]

    expect(getFilterColumnCandidates(columnDefinition, t, decodeColumn)).toEqual([])
  })

  it('skips a column whose field key is claimed by more than one configured column', () => {
    const columnDefinition: Array<ColumnDef<any>> = [
      { id: '{"key":"name"}', header: 'Name' },
      { id: '{"key":"created"}', header: 'Created' }
    ]

    // The row values are looked up by the plain field key, so the value of a key
    // two columns claim - here the same key of another group - is ambiguous.
    const ambiguousColumns: SelectedColumn[] = [
      { key: 'name', type: 'dataobject.adapter', config: {}, sortable: false, editable: false, localizable: false },
      { key: 'name', type: 'dataobject.adapter', config: {}, sortable: false, editable: false, localizable: false },
      { key: 'created', type: 'dataobject.adapter', config: {}, sortable: false, editable: false, localizable: false }
    ]

    expect(getFilterColumnCandidates(columnDefinition, t, decodeColumn, ambiguousColumns).map((column) => column.valueKey))
      .toEqual(['created'])
  })
})

describe('resolveRowValue', () => {
  const item: DisplayManyToManyRelationValueItem = {
    id: 7,
    type: 'object',
    subtype: 'Product',
    fullPath: '/Products/Chair',
    isPublished: true
  }

  const visibleFieldsMap = buildVisibleFieldsMap([{ id: 7, name: 'Wooden chair' }, undefined])

  it('reads the keys of the relation item from the item', () => {
    const [idColumn, fullPathColumn, , subtypeColumn] = getDefaultRelationFilterColumns(t)

    expect(resolveRowValue(item, idColumn, visibleFieldsMap)).toBe(7)
    expect(resolveRowValue(item, fullPathColumn, visibleFieldsMap)).toBe('/Products/Chair')
    expect(resolveRowValue(item, subtypeColumn, visibleFieldsMap)).toBe('Product')
  })

  it('reads the legacy visible field keys from the item as well', () => {
    expect(resolveRowValue(item, { key: 'a', valueKey: 'fullpath', title: '', type: 'string' }, visibleFieldsMap)).toBe('/Products/Chair')
    expect(resolveRowValue(item, { key: 'b', valueKey: 'classname', title: '', type: 'string' }, visibleFieldsMap)).toBe('Product')
  })

  it('reads every other key from the visible fields', () => {
    expect(resolveRowValue(item, { key: 'c', valueKey: 'name', title: '', type: 'string' }, visibleFieldsMap)).toBe('Wooden chair')
  })
})
