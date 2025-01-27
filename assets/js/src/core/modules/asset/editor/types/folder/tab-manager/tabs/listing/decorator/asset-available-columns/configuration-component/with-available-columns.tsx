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
import { useAssetGetAvailableGridColumnsQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { UseSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SelectedColumnsContextProps } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'

export const withAvailableColumns = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const availableColumnsConfigurationComponent = (): React.JSX.Element => {
    const { data } = useAssetGetAvailableGridColumnsQuery()
    const { setSelectedColumns } = UseSelectedColumns()

    useEffect(() => {
      if (data === undefined) {
        return
      }

      const availableColumns: SelectedColumnsContextProps['selectedColumns'] = data.columns!.map(column => ({
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
      }))

      setSelectedColumns(availableColumns)
    }, [data])

    return (
      <Component />
    )
  }

  return availableColumnsConfigurationComponent
}
