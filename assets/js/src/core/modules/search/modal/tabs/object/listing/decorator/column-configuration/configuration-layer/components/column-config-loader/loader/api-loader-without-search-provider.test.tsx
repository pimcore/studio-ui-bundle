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
import { SearchProvider } from '@Pimcore/modules/search/provider/search-provider'

// The element selectors reuse this loader outside the Quick Search modal, so there is no
// SearchProvider above it. Unlike api-loader.test.tsx, use-search is deliberately not mocked here.

const setSelectedColumns = jest.fn()
const setAvailableColumns = jest.fn()
const setGridConfig = jest.fn()
const setDataLoadingState = jest.fn()

const columns = { columns: [{ key: 'id' }, { key: 'color' }] }
const configuration = { columns: [{ key: 'color' }] }

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useElementId: () => ({ getId: () => 1 }),
    ViewComponent: () => null,
    useDataQueryHelper: () => ({ setDataLoadingState })
  })
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetAvailableGridColumnsQuery: () => ({ isLoading: false, currentData: columns })
}))
jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({
  useDataObjectGetSearchConfigurationQuery: () => ({ isLoading: false, currentData: configuration })
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
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 'CAR' } })
}))

const Configuration = (): React.JSX.Element => <div />

describe('ApiLoader outside the Quick Search modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('applies the class defaults when there is no SearchProvider above it', () => {
    render(<ApiLoader Component={ Configuration } />)

    expect(setSelectedColumns).toHaveBeenCalledTimes(1)
    expect(setSelectedColumns.mock.calls[0][0].map((column: { key: string }) => column.key)).toEqual(['color'])
    expect(setAvailableColumns).toHaveBeenCalledTimes(1)
  })

  it('still leaves the columns to a pending restore when a SearchProvider is present', () => {
    const initialPendingRestore = { classId: 'CAR', columns: [{ key: 'id' }] }
    render(
      <SearchProvider initialPendingRestore={ initialPendingRestore as never }>
        <ApiLoader Component={ Configuration } />
      </SearchProvider>
    )

    expect(setSelectedColumns).not.toHaveBeenCalled()
    expect(setAvailableColumns).toHaveBeenCalledTimes(1)
  })
})
