/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useDataObjectColumnMapper } from './use-column-mapper'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'

/**
 * Regression tests for https://github.com/pimcore/service-operations/issues/927
 * (PEES-1244): every "advanced" grid column is added from a shared template
 * whose `key` is the reserved literal `'advanced'`. When the user leaves the
 * title blank on two or more advanced columns, `SelectedColumn.key` collides
 * (it falls back to that shared literal), so `decodeColumnIdentifier` and
 * `shouldMapDataToColumn` - both plain equality/`.find()` lookups by `key` -
 * always resolve to the *first* matching column. Every colliding cell in the
 * grid then displays the first advanced column's value.
 */

function createAdvancedColumn (uniqueId: string, title?: string): SelectedColumn {
  return {
    key: title ?? 'advanced',
    type: 'dataobject.advanced',
    config: {},
    sortable: false,
    editable: false,
    localizable: false,
    locale: null,
    originalApiDefinition: {
      key: 'advanced',
      __meta: {
        uniqueId,
        advancedColumnConfig: { title }
      }
    }
  }
}

describe('useDataObjectColumnMapper - dataobject.advanced columns (#927)', () => {
  it('decodes each advanced column identifier back to its own column, not the first one sharing a blank title', () => {
    const { result } = renderHook(() => useDataObjectColumnMapper())
    const columnA = createAdvancedColumn('uniqueId-aaa')
    const columnB = createAdvancedColumn('uniqueId-bbb')
    const selectedColumns = [columnA, columnB]

    const identifierA = result.current.encodeColumnIdentifier(columnA)
    const identifierB = result.current.encodeColumnIdentifier(columnB)

    expect(result.current.decodeColumnIdentifier(identifierA, selectedColumns)).toBe(columnA)
    expect(result.current.decodeColumnIdentifier(identifierB, selectedColumns)).toBe(columnB)
  })

  it('maps each row value to the advanced column it actually belongs to, not to the first colliding one', () => {
    const { result } = renderHook(() => useDataObjectColumnMapper())
    const columnA = createAdvancedColumn('uniqueId-aaa')
    const columnB = createAdvancedColumn('uniqueId-bbb')

    // The backend echoes back whatever key was sent for each advanced column
    // (see use-data-query-helper.ts) - i.e. the column's unique instance id. A
    // null column locale is resolved to the current UI language ('en' by default,
    // see LanguageSelectionContext) before the request is sent, so the response
    // carries that resolved locale rather than null.
    const rowDataForA = { key: 'uniqueId-aaa', locale: 'en', value: 'value for A' }
    const rowDataForB = { key: 'uniqueId-bbb', locale: 'en', value: 'value for B' }

    expect(result.current.shouldMapDataToColumn(rowDataForA, columnA)).toBe(true)
    expect(result.current.shouldMapDataToColumn(rowDataForA, columnB)).toBe(false)
    expect(result.current.shouldMapDataToColumn(rowDataForB, columnB)).toBe(true)
    expect(result.current.shouldMapDataToColumn(rowDataForB, columnA)).toBe(false)
  })

  it('matches an advanced column with an explicit locale against that exact locale, not the current UI language', () => {
    const { result } = renderHook(() => useDataObjectColumnMapper())
    const column = { ...createAdvancedColumn('uniqueId-aaa'), locale: 'de' }

    expect(result.current.shouldMapDataToColumn({ key: 'uniqueId-aaa', locale: 'de' }, column)).toBe(true)
    expect(result.current.shouldMapDataToColumn({ key: 'uniqueId-aaa', locale: 'en' }, column)).toBe(false)
  })

  it('still distinguishes two advanced columns that were given the same non-empty title', () => {
    const { result } = renderHook(() => useDataObjectColumnMapper())
    const columnA = createAdvancedColumn('uniqueId-aaa', 'Total')
    const columnB = createAdvancedColumn('uniqueId-bbb', 'Total')
    const selectedColumns = [columnA, columnB]

    const identifierA = result.current.encodeColumnIdentifier(columnA)
    const identifierB = result.current.encodeColumnIdentifier(columnB)

    expect(result.current.decodeColumnIdentifier(identifierA, selectedColumns)).toBe(columnA)
    expect(result.current.decodeColumnIdentifier(identifierB, selectedColumns)).toBe(columnB)
  })

  it('leaves plain (non-advanced) field columns matched by key as before', () => {
    const { result } = renderHook(() => useDataObjectColumnMapper())
    const column: SelectedColumn = {
      key: 'firstname',
      type: 'input',
      config: {},
      sortable: true,
      editable: true,
      localizable: false,
      locale: null
    }

    const identifier = result.current.encodeColumnIdentifier(column)

    expect(result.current.decodeColumnIdentifier(identifier, [column])).toBe(column)
    expect(result.current.shouldMapDataToColumn({ key: 'firstname', locale: null }, column)).toBe(true)
  })
})
