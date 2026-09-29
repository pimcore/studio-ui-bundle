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
let selectedClassId = 'CAR'

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
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: selectedClassId }, setSelectedClassDefinition })
}))

// one catalog object, as RTK hands back: a fresh one per render would re-run the class effect on its own
const classCatalog = { items: [{ id: 'CAR' }] }
jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({ getById: () => ({ id: 'CAR' }), data: classCatalog })
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

describe('ObjectSavedSearchRestore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }, { key: 'color' }]
    classColumns = availableColumns
    selectedColumns = []
    selectedClassId = 'CAR'
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
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'goneFromTheClass' }],
      filter: [{ columnFilters: [] }]
    }

    render(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('still applies when the grid does not yet carry the saved columns', () => {
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'id' }, { key: 'color' }],
      filter: [{ columnFilters: [] }]
    }

    render(<ObjectSavedSearchRestore />)

    expect(applySavedSearch).toHaveBeenCalledWith(pendingRestore)
  })

  it('consumes a search on a class with no data fields once that class\'s column set is loaded', () => {
    jest.useFakeTimers()
    // the class offers only the system columns; the search still names a field the class lost
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }]
    classColumns = availableColumns
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'id' }, { key: 'deletedField' }],
      filter: [{ columnFilters: [] }]
    }

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
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'id' }],
      filter: [{ columnFilters: [] }]
    }

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
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'name', locale: 'de', width: 300 }],
      filter: [{ columnFilters: [] }]
    }

    const { rerender } = render(<ObjectSavedSearchRestore />)
    // a default configuration landing after the apply: same key, default locale and width
    selectedColumns = [{ key: 'name', locale: null, width: null }]
    rerender(<ObjectSavedSearchRestore />)
    act(() => { jest.advanceTimersByTime(5000) })

    expect(applySavedSearch).toHaveBeenCalledTimes(2)
    expect(setPendingRestore).not.toHaveBeenCalled()
  })

  it('selects the saved class again when the class changes before the restore is consumed', () => {
    pendingRestore = {
      elementType: 'data-object',
      classId: 'CAR',
      columns: [{ key: 'id' }],
      filter: [{ columnFilters: [] }]
    }

    const { rerender } = render(<ObjectSavedSearchRestore />)
    // the user picks another class inside the convergence window
    selectedClassId = 'AP'
    rerender(<ObjectSavedSearchRestore />)

    expect(setSelectedClassDefinition).toHaveBeenCalledWith({ id: 'CAR' })
  })
})
