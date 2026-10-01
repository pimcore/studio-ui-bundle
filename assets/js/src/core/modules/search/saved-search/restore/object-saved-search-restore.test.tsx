/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render } from '@testing-library/react'
import { ObjectSavedSearchRestore } from './object-saved-search-restore'

const applySavedSearch = jest.fn()
const setPendingRestore = jest.fn()
const setSelectedClassDefinition = jest.fn()

let pendingRestore: Record<string, unknown> | undefined
let availableColumns: Array<{ key: string }> = []
let selectedColumns: Array<{ key: string, locale?: string | null, width?: number | null }> = []
let classColumns: Array<{ key: string }> | undefined
let selectedClassId: string | undefined = 'CAR'
let availableClassDefinitions: Array<{ id: string }> = [{ id: 'CAR' }, { id: 'AP' }]

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ pendingRestore, setPendingRestore })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ availableColumns })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns })
}))

jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({
    selectedClassDefinition: selectedClassId === undefined ? undefined : { id: selectedClassId },
    setSelectedClassDefinition,
    availableClassDefinitions
  })
}))

// one catalog object, as RTK hands back: a fresh one per render would re-run the class effect on its own
const loadedCatalog = { items: [{ id: 'CAR' }] }
let classCatalog: typeof loadedCatalog | undefined = loadedCatalog
jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({
    getById: (id: string) => (classCatalog !== undefined && id === 'CAR' ? { id: 'CAR' } : undefined),
    data: classCatalog
  })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useElementId: () => ({ getId: () => 1 }) })
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsQuery: () => ({ currentData: classColumns === undefined ? undefined : { columns: classColumns } })
}))

jest.mock('./use-apply-saved-search', () => ({
  useApplySavedSearch: () => applySavedSearch
}))

const objectSearch = (classId: string, columns: Array<Record<string, unknown>>): Record<string, unknown> => ({
  elementType: 'data-object',
  classId,
  columns,
  filter: [{ columnFilters: [] }]
})

describe('ObjectSavedSearchRestore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }, { key: 'color' }]
    classColumns = availableColumns
    selectedColumns = []
    selectedClassId = 'CAR'
    availableClassDefinitions = [{ id: 'CAR' }, { id: 'AP' }]
    classCatalog = loadedCatalog
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('applies a search that names no columns — its filter still has to reach the grid', () => {
    // a proposal can carry a predicate and no column list at all; the column match would
    // otherwise read as "already applied" before anything had been
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [],
      filter: [{ columnFilters: [{ type: 'system.pql', filterValue: 'color = "red"' }] }]
    }

    render(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('applies a search whose columns are all unavailable, rather than treating it as done', () => {
    pendingRestore = objectSearch('CAR', [{ key: 'goneFromTheClass' }])

    render(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('still applies when the grid does not yet carry the saved columns', () => {
    pendingRestore = objectSearch('CAR', [{ key: 'id' }, { key: 'color' }])

    render(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('consumes a search on a class with no data fields once that class\'s column set is loaded', () => {
    jest.useFakeTimers()
    // the class offers only the system columns; the search still names a field the class lost
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }]
    classColumns = availableColumns
    pendingRestore = objectSearch('CAR', [{ key: 'id' }, { key: 'deletedField' }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    selectedColumns = [{ key: 'id', locale: null }]
    rerender(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(1200) })

    expect(setPendingRestore).toHaveBeenCalledWith(undefined)
  })

  it('is not consumed while the listing still carries a column set other than the class\'s', () => {
    jest.useFakeTimers()
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }]
    classColumns = [{ key: 'id' }, { key: 'fullpath' }, { key: 'color' }]
    pendingRestore = objectSearch('CAR', [{ key: 'id' }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    selectedColumns = [{ key: 'id', locale: null }]
    rerender(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(5000) })

    expect(setPendingRestore).not.toHaveBeenCalled()
  })

  it('re-applies when a late write keeps the keys but drops the saved locale and width', () => {
    jest.useFakeTimers()
    availableColumns = [{ key: 'id' }, { key: 'name' }]
    classColumns = availableColumns
    pendingRestore = objectSearch('CAR', [{ key: 'name', locale: 'de', width: 300 }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    // a default configuration landing after the apply: same key, default locale and width
    selectedColumns = [{ key: 'name', locale: null, width: null }]
    rerender(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(5000) })

    expect(applySavedSearch).toHaveBeenCalledTimes(2)
    expect(setPendingRestore).not.toHaveBeenCalled()
  })

  it('selects the saved class again when the class changes before the restore is consumed', () => {
    pendingRestore = objectSearch('CAR', [{ key: 'id' }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    // the user picks another class inside the convergence window
    selectedClassId = 'AP'
    rerender(<ObjectSavedSearchRestore />)

    expect(setSelectedClassDefinition).toHaveBeenCalledWith({ id: 'CAR' })
  })

  it('consumes a search that names no columns, not only applies it', () => {
    jest.useFakeTimers()
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [],
      filter: [{ columnFilters: [{ type: 'system.pql', filterValue: 'color = "red"' }] }]
    }

    render(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(1200) })

    expect(applySavedSearch).toHaveBeenCalledTimes(1)
    expect(setPendingRestore).toHaveBeenCalledWith(undefined)
  })

  it('applies the same configuration again when a host hands it back after consumption', () => {
    jest.useFakeTimers()
    const configuration = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [],
      filter: [{ columnFilters: [{ type: 'system.pql', filterValue: 'color = "red"' }] }]
    }
    pendingRestore = configuration

    const { rerender } = render(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(1200) })
    pendingRestore = undefined
    rerender(<ObjectSavedSearchRestore />)
    pendingRestore = configuration
    rerender(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledTimes(2)
  })

  it('restores a search whose class was deleted classless, once the catalog has loaded', () => {
    jest.useFakeTimers()
    selectedClassId = undefined
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }]
    pendingRestore = objectSearch('DELETED', [{ key: 'id' }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    selectedColumns = [{ key: 'id', locale: null }]
    rerender(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(1200) })

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
    expect(setSelectedClassDefinition).not.toHaveBeenCalled()
    expect(setPendingRestore).toHaveBeenCalledWith(undefined)
  })

  it('waits for a class it cannot find while the catalog is still loading', () => {
    jest.useFakeTimers()
    classCatalog = undefined
    pendingRestore = objectSearch('CAR', [{ key: 'id' }])
    selectedClassId = 'OTHER'

    render(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(5000) })

    expect(applySavedSearch).not.toHaveBeenCalled()
    expect(setPendingRestore).not.toHaveBeenCalled()
  })

  it('drops a stale class selection before restoring a deleted-class search classless', () => {
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }]
    pendingRestore = objectSearch('DELETED', [{ key: 'id' }])

    const { rerender } = render(<ObjectSavedSearchRestore />)
    expect(setSelectedClassDefinition).toHaveBeenCalledWith(undefined)
    expect(applySavedSearch).not.toHaveBeenCalled()

    selectedClassId = undefined
    rerender(<ObjectSavedSearchRestore />)
    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('restores a deleted-class search against the only class a single-class listing offers', () => {
    availableClassDefinitions = [{ id: 'CAR' }]
    pendingRestore = objectSearch('DELETED', [{ key: 'id' }])

    render(<ObjectSavedSearchRestore />)

    expect(setSelectedClassDefinition).not.toHaveBeenCalled()
    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })
})
