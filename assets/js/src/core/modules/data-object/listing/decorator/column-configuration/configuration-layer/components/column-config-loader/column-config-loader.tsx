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

import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React, { useEffect } from 'react'
import { useClassDefinitionSelection } from '../../../../class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useDataObjectGetAvailableGridColumnsQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'

export interface ColumnConfigLoaderProps {
  Component: AbstractDecoratorProps['ConfigurationComponent']
}

export const ColumnConfigLoader = ({ Component }: ColumnConfigLoaderProps): React.JSX.Element => {
  const { useElementId, ViewComponent, useDataQueryHelper } = useSettings()
  const { setDataLoadingState } = useDataQueryHelper()
  const { getId } = useElementId()
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { isLoading, data } = useDataObjectGetAvailableGridColumnsQuery({ folderId: getId(), classId: selectedClassDefinition!.id })
  const { selectedColumns, setSelectedColumns } = useSelectedColumns()
  const { setAvailableColumns } = useAvailableColumns()

  useEffect(() => {
    if (data === undefined) {
      return
    }

    const selectedColumns: SelectedColumnsContextProps['selectedColumns'] = []

    for (const column of data.columns!) {
      // @todo Skip filename due to backend bug for now.
      if (column.key === 'filename') {
        continue
      }

      selectedColumns.push({
        key: column.key,
        locale: column.locale,
        type: column.type,
        config: column.config,
        sortable: column.sortable,
        editable: column.editable,
        localizable: column.localizable,
        exportable: column.exportable,
        frontendType: column.frontendType,
        group: column.group,
        originalApiDefinition: column
      })
    }

    setSelectedColumns(selectedColumns)
    setAvailableColumns(data.columns!)
    setDataLoadingState('config-changed')
  }, [data])

  if (isLoading || selectedColumns.length === 0) {
    return <ViewComponent />
  }

  return (
    <Component />
  )
}
