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
import { ApiLoader } from './api-loader'

const setSelectedColumns = jest.fn()
const setAvailableColumns = jest.fn()
const setGridConfig = jest.fn()
const setDataLoadingState = jest.fn()

let classId = 'CAR'
let pendingRestore: Record<string, unknown> | undefined
let loadedSavedSearch: Record<string, unknown> | undefined
const responses: Record<string, { columns: Array<{ key: string }> }> = {
  CAR: { columns: [{ key: 'id' }, { key: 'color' }] },
  AP: { columns: [{ key: 'id' }, { key: 'erpNumber' }] }
}
const configurations: Record<string, { columns: Array<{ key: string }> }> = {
  CAR: { columns: [{ key: 'color' }] },
  AP: { columns: [{ key: 'erpNumber' }] }
}

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useElementId: () => ({ getId: () => 1 }),
    ViewComponent: () => null,
    useDataQueryHelper: () => ({ setDataLoadingState })
  })
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsQuery: () => ({ isLoading: false, currentData: responses[classId] })
}))
jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({
  useDataObjectGetSearchConfigurationQuery: () => ({ isLoading: false, currentData: configurations[classId] })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns: [], setSelectedColumns })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ setAvailableColumns })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config', () => ({
  useGridConfig: () => ({ setGridConfig })
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: classId } })
}))
jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ pendingRestore, loadedSavedSearch })
}))

const Configuration = (): React.JSX.Element => <div />
const appliedKeys = (call: number): string[] =>
  setSelectedColumns.mock.calls[call][0].map((column: { key: string }) => column.key)

describe('ApiLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    classId = 'CAR'
    pendingRestore = undefined
    loadedSavedSearch = undefined
  })

  it('leaves the columns to a saved search still being restored onto this class', () => {
    pendingRestore = { classId: 'CAR', columns: [{ key: 'id' }] }
    render(<ApiLoader Component={ Configuration } />)

    expect(setSelectedColumns).not.toHaveBeenCalled()
    expect(setAvailableColumns).toHaveBeenCalledTimes(1)
  })

  it('shows a class\'s own defaults when the grid comes back to it after a restore', () => {
    // a saved search on this class was opened and its restore has finished
    loadedSavedSearch = { classId: 'CAR', columns: [{ key: 'id' }] }
    const { rerender } = render(<ApiLoader Component={ Configuration } />)
    classId = 'AP'
    rerender(<ApiLoader Component={ Configuration } />)
    classId = 'CAR'
    rerender(<ApiLoader Component={ Configuration } />)

    expect(setSelectedColumns).toHaveBeenCalledTimes(3)
    expect(appliedKeys(1)).toEqual(['erpNumber'])
    expect(appliedKeys(2)).toEqual(['color'])
  })

  it('falls back to the class defaults when none of the saved columns exist in this class', () => {
    pendingRestore = { classId: 'CAR', columns: [{ key: 'goneFromTheClass' }] }
    render(<ApiLoader Component={ Configuration } />)

    expect(setSelectedColumns).toHaveBeenCalledTimes(1)
    expect(appliedKeys(0)).toEqual(['color'])
  })
})
