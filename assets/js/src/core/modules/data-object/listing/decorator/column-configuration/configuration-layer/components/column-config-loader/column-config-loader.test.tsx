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
import { ColumnConfigLoader } from './column-config-loader'

const setSelectedColumns = jest.fn()
const setAvailableColumns = jest.fn()
const setGridConfig = jest.fn()
const setDataLoadingState = jest.fn()

let columnsResponse: { columns: Array<{ key: string }> } | undefined
let configurationResponse: { columns: Array<{ key: string }>, saveFilter: boolean } | undefined

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useElementId: () => ({ getId: () => 1 }),
    ViewComponent: () => null,
    useDataQueryHelper: () => ({ setDataLoadingState })
  })
}))
jest.mock('../../../../class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: 'CAR' } })
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  useDataObjectGetAvailableGridColumnsQuery: () => ({ isLoading: false, currentData: columnsResponse }),
  useDataObjectGetGridConfigurationQuery: () => ({ isLoading: false, currentData: configurationResponse })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns: [], setSelectedColumns })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ setAvailableColumns })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id', () => ({
  useSelectedGridConfigId: () => ({ id: undefined })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config', () => ({
  useGridConfig: () => ({ setGridConfig })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/general-filters/element-filters', () => ({
  useAppliedFiltersOptional: () => undefined
}))

const Configuration = (): React.JSX.Element => <div />

describe('ColumnConfigLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    columnsResponse = { columns: [{ key: 'id' }, { key: 'color' }] }
    configurationResponse = { columns: [{ key: 'id' }], saveFilter: false }
  })

  it('applies a response pair once, however often it re-renders with it', () => {
    const { rerender } = render(<ColumnConfigLoader Component={ Configuration } />)
    rerender(<ColumnConfigLoader Component={ Configuration } />)

    expect(setSelectedColumns).toHaveBeenCalledTimes(1)
  })

  it('applies a changed response for the same arguments, such as the favourite after a delete', () => {
    const { rerender } = render(<ColumnConfigLoader Component={ Configuration } />)
    configurationResponse = { columns: [{ key: 'color' }], saveFilter: false }
    rerender(<ColumnConfigLoader Component={ Configuration } />)

    expect(setSelectedColumns).toHaveBeenCalledTimes(2)
    expect(setSelectedColumns.mock.calls[1][0].map((column: { key: string }) => column.key)).toEqual(['color'])
    expect(setGridConfig).toHaveBeenLastCalledWith(configurationResponse)
  })

  it('applies nothing while one answer for the current arguments is still missing', () => {
    configurationResponse = undefined
    render(<ColumnConfigLoader Component={ Configuration } />)

    expect(setSelectedColumns).not.toHaveBeenCalled()
    expect(setAvailableColumns).not.toHaveBeenCalled()
  })
})
