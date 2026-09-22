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
import { render } from '@testing-library/react'

const applySavedSearch = jest.fn()
const setPendingRestore = jest.fn()
const setSelectedClassDefinition = jest.fn()

let pendingRestore: Record<string, unknown> | undefined
let availableColumns: Array<{ key: string }> = []
let selectedColumns: Array<{ key: string }> = []

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
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 'CAR' }, setSelectedClassDefinition })
}))

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({ getById: () => ({ id: 'CAR' }), data: { items: [{ id: 'CAR' }] } })
}))

jest.mock('./use-apply-saved-search', () => ({
  useApplySavedSearch: () => applySavedSearch,
  restoredColumnKeys: (saved: Array<{ key?: string }>, available: Array<{ key: string }>) =>
    saved.map((column) => column.key ?? '').filter((key) => available.some((entry) => entry.key === key))
}))

const { ObjectSavedSearchRestore } = require('./object-saved-search-restore')

describe('ObjectSavedSearchRestore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    availableColumns = [{ key: 'id' }, { key: 'fullpath' }, { key: 'color' }]
    selectedColumns = []
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
})
