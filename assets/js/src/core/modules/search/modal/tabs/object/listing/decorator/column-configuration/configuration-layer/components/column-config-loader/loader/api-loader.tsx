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
import { useDataObjectGetAvailableGridColumnsQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useGridConfig } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useDataObjectGetSearchConfigurationQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { uuid } from '@Pimcore/utils/uuid'

export interface ColumnConfigLoaderProps {
  Component: AbstractDecoratorProps['ConfigurationComponent']
}

export const ApiLoader = ({ Component }: ColumnConfigLoaderProps): React.JSX.Element => {
  const { useElementId, ViewComponent, useDataQueryHelper } = useSettings()
  const { setDataLoadingState } = useDataQueryHelper()
  const { getId } = useElementId()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { isLoading, data } = useDataObjectGetAvailableGridColumnsQuery({ folderId: getId(), classId: selectedClassDefinition!.id })
  const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = useDataObjectGetSearchConfigurationQuery({ classId: selectedClassDefinition!.id })
  const { selectedColumns, setSelectedColumns } = useSelectedColumns()
  const { setAvailableColumns } = useAvailableColumns()
  const { setGridConfig } = useGridConfig()

  useEffect(() => {
    if (data === undefined || initialConfigurationData === undefined) {
      return
    }

    const selectedColumns: SelectedColumnsContextProps['selectedColumns'] = []
    const availableColumns: AvailableColumn[] = data.columns!.map(column => column)

    for (const column of initialConfigurationData.columns) {
      if (column.key === 'filename') {
        continue
      }
      const availableColumn = data.columns!.find(availableColumn => availableColumn.key === column.key)

      if (availableColumn !== undefined) {
        const apiColumn = {
          ...availableColumn,
          __meta: {
            // Advanced columns share the same reserved 'advanced' key (and often a
            // blank/duplicate title) from a persisted config, which is not unique -
            // assign each loaded instance its own id so it can be told apart from
            // sibling advanced columns (https://github.com/pimcore/service-operations/issues/927).
            uniqueId: uuid(),
            advancedColumnConfig: ('config' in column ? column.config : undefined) ?? {}
          }
        }

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
          originalApiDefinition: apiColumn
        })
      }
    }

    setSelectedColumns(selectedColumns)
    setAvailableColumns(availableColumns)
    setGridConfig(initialConfigurationData)
    setDataLoadingState('config-changed')
  }, [data, initialConfigurationData])

  if (isLoading || isInitialConfigLoading || selectedColumns.length === 0) {
    return <ViewComponent />
  }

  return (
    <Component />
  )
}
