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

// The loader effect depends on both the grid configuration and the available columns, and
// it restores the configuration's saved filters. Until the available columns were tagged
// they never changed after the first load, so the effect ran once and the restore was
// always a configuration load. Now a class definition save invalidates them, the effect
// runs again, and restoring the saved filters at that point would silently replace the
// filters the user has applied and show a different set of rows.

let classId = 'Product'

const columnsV1 = { columns: [{ key: 'name', type: 'input', config: {} }] }
const columnsV2 = { columns: [{ key: 'name', type: 'input', config: {} }, { key: 'added', type: 'input', config: {} }] }

const configuration = {
  columns: [{ key: 'name' }],
  saveFilter: true,
  filter: { columnFilters: [{ key: 'name', filterValue: 'saved' }] }
}

let availableColumnsData: unknown = columnsV1
let configurationData: unknown = configuration
// What RTK Query keeps in data while a request for new arguments is in flight: the result
// for the previous arguments. currentData is undefined until the current arguments resolve.
let staleAvailableColumnsData: unknown

const setValue = jest.fn()

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({
    useElementId: () => ({ getId: () => 1 }),
    ViewComponent: () => <div data-testid="view" />,
    useDataQueryHelper: () => ({ setDataLoadingState: jest.fn() })
  })
}))

jest.mock('../../../../class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelection: () => ({ selectedClassDefinition: { id: classId } })
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  useDataObjectGetAvailableGridColumnsQuery: () => ({ isLoading: false, data: availableColumnsData ?? staleAvailableColumnsData, currentData: availableColumnsData }),
  useDataObjectGetGridConfigurationQuery: () => ({ isLoading: false, data: configurationData, currentData: configurationData })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns: [{ key: 'name' }], setSelectedColumns: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ setAvailableColumns: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id', () => ({
  useSelectedGridConfigId: () => ({ id: 1 })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config', () => ({
  useGridConfig: () => ({ setGridConfig: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/general-filters/element-filters', () => ({
  useAppliedFiltersOptional: () => ({ setValue })
}))

const restoreFieldFilters = jest.fn((_filter: unknown, _availableColumns: unknown) => [{ key: 'name', value: 'saved' }])

jest.mock('./restore-field-filters', () => ({
  restoreFieldFilters: (filter: unknown, availableColumns: unknown) => restoreFieldFilters(filter, availableColumns)
}))

const { ColumnConfigLoader } = jest.requireActual('./column-config-loader')

const Component = (): React.JSX.Element => <div data-testid="grid" />

const renderLoader = (): ReturnType<typeof render> =>
  render(<ColumnConfigLoader Component={ Component } />)

describe('column config loader', () => {
  beforeEach(() => {
    setValue.mockClear()
    restoreFieldFilters.mockClear()
    classId = 'Product'
    availableColumnsData = columnsV1
    configurationData = configuration
    staleAvailableColumnsData = undefined
  })

  it('restores the saved filters when the grid configuration loads', () => {
    renderLoader()

    expect(setValue).toHaveBeenCalledWith('fieldFilters', [{ key: 'name', value: 'saved' }])
  })

  it('leaves the applied filters alone when only the available columns change', () => {
    const view = renderLoader()
    expect(setValue).toHaveBeenCalledTimes(1)

    // What a class definition save now does: same configuration, new column metadata.
    availableColumnsData = columnsV2
    view.rerender(<ColumnConfigLoader Component={ Component } />)

    expect(setValue).toHaveBeenCalledTimes(1)
  })

  it('restores them again when a different grid configuration is loaded', () => {
    const view = renderLoader()

    configurationData = { ...configuration, columns: [{ key: 'name' }] }
    view.rerender(<ColumnConfigLoader Component={ Component } />)

    expect(setValue).toHaveBeenCalledTimes(2)
  })

  it('waits for the new class columns before restoring the filters on a class switch', () => {
    const view = renderLoader()
    expect(setValue).toHaveBeenCalledTimes(1)

    const otherColumns = { columns: [{ key: 'sku', type: 'input', config: {} }] }
    const otherConfiguration = { ...configuration, columns: [{ key: 'sku' }], filter: { columnFilters: [{ key: 'sku', filterValue: 'saved' }] } }

    // The other class's configuration is already cached, its columns are still loading.
    classId = 'Accessory'
    configurationData = otherConfiguration
    staleAvailableColumnsData = columnsV1
    availableColumnsData = undefined
    view.rerender(<ColumnConfigLoader Component={ Component } />)

    expect(setValue).toHaveBeenCalledTimes(1)

    availableColumnsData = otherColumns
    view.rerender(<ColumnConfigLoader Component={ Component } />)

    expect(setValue).toHaveBeenCalledTimes(2)
    expect(restoreFieldFilters).toHaveBeenLastCalledWith(otherConfiguration.filter, otherColumns.columns)
  })

  it('never touches the filters for a configuration that does not manage them', () => {
    configurationData = { ...configuration, saveFilter: false }

    renderLoader()

    expect(setValue).not.toHaveBeenCalled()
  })
})
