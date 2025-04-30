/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { staticAvailableColumns } from './static-available-columns'

export const withColumnConfiguration = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const WithAssetColumnConfiguration = (): React.JSX.Element => {
    const { useDataQueryHelper } = useSettings()
    const { setSelectedColumns } = useSelectedColumns()
    const { setAvailableColumns } = useAvailableColumns()
    const { setDataLoadingState } = useDataQueryHelper()

    useEffect(() => {
      const selectedColumns: SelectedColumnsContextProps['selectedColumns'] = []
      const initialSelectedColumnKeys = ['type', 'fullpath', 'preview']

      for (const column of staticAvailableColumns) {
        if (initialSelectedColumnKeys.includes(column.key)) {
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
            originalApiDefinition: column,
            group: column.group
          })
        }
      }

      setSelectedColumns(selectedColumns)
      setAvailableColumns(staticAvailableColumns)
      setDataLoadingState('config-changed')
    }, [])

    return (
      <Component />
    )
  }

  return WithAssetColumnConfiguration
}
