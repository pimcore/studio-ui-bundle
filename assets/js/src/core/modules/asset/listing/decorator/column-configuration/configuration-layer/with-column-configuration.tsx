/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useAssetGetAvailableGridColumnsQuery, useAssetGetGridConfigurationByFolderIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { Content } from '@Pimcore/components/content/content'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useSelectedGridConfigId } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id'
import { useGridConfig } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config'

export const withColumnConfiguration = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const WithAssetColumnConfiguration = (): React.JSX.Element => {
    const { isLoading, data } = useAssetGetAvailableGridColumnsQuery()
    const { useElementId, useDataQueryHelper } = useSettings()
    const { getId } = useElementId()
    const { id: configId } = useSelectedGridConfigId()
    const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = useAssetGetGridConfigurationByFolderIdQuery({ folderId: getId(), configurationId: configId })
    const { setSelectedColumns } = useSelectedColumns()
    const { setAvailableColumns } = useAvailableColumns()
    const { setGridConfig } = useGridConfig()
    const { setDataLoadingState } = useDataQueryHelper()
    const isConfigLoading = isLoading || isInitialConfigLoading

    useEffect(() => {
      if (data === undefined || initialConfigurationData === undefined) {
        return
      }

      const selectedColumns: SelectedColumnsContextProps['selectedColumns'] = []
      const availableColumns: AvailableColumn[] = data.columns!.map(column => column)

      for (const column of initialConfigurationData.columns) {
        const availableColumn = data.columns!.find(availableColumn => availableColumn.key === column.key)

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
    }, [data, initialConfigurationData])

    if (isConfigLoading) {
      return <Content loading />
    }

    return (
      <Component />
    )
  }

  return WithAssetColumnConfiguration
}
