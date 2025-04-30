/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React, { useEffect } from 'react'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useGridConfig } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config'
import { useDataObjectGetSearchConfigurationQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { staticAvailableColumns } from './static-config/available-columns'

export interface ColumnConfigLoaderProps {
  Component: AbstractDecoratorProps['ConfigurationComponent']
}

export const StaticLoader = ({ Component }: ColumnConfigLoaderProps): React.JSX.Element => {
  const { ViewComponent, useDataQueryHelper } = useSettings()
  const { setDataLoadingState } = useDataQueryHelper()
  const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = useDataObjectGetSearchConfigurationQuery({ classId: undefined })
  const { selectedColumns, setSelectedColumns } = useSelectedColumns()
  const { setAvailableColumns } = useAvailableColumns()
  const { setGridConfig } = useGridConfig()

  useEffect(() => {
    if (initialConfigurationData === undefined) {
      return
    }

    const selectedColumns: SelectedColumnsContextProps['selectedColumns'] = []
    const availableColumns: AvailableColumn[] = staticAvailableColumns

    for (const column of initialConfigurationData.columns) {
      if (column.key === 'advanced' || column.key === 'filename') {
        continue
      }

      const availableColumn = availableColumns.find(availableColumn => availableColumn.key === column.key)

      if (availableColumn !== undefined) {
        selectedColumns.push({
          key: column.key,
          locale: column.locale,
          type: availableColumn.type,
          config: availableColumn.config,
          sortable: availableColumn.sortable,
          editable: availableColumn.editable,
          localizable: availableColumn.localizable,
          exportable: availableColumn.exportable,
          frontendType: availableColumn.frontendType,
          group: availableColumn.group,
          originalApiDefinition: availableColumn
        })
      }
    }

    setSelectedColumns(selectedColumns)
    setAvailableColumns(availableColumns)
    setGridConfig(initialConfigurationData)
    setDataLoadingState('config-changed')
  }, [initialConfigurationData])

  if (isInitialConfigLoading || selectedColumns.length === 0) {
    return <ViewComponent />
  }

  return (
    <Component />
  )
}
