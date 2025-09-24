/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { GridContentRenderer } from '@Pimcore/components/grid-content-renderer/grid-content-renderer'
import { Grid } from '@Pimcore/components/grid/grid'
import { type DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/dynamic-type-grid-cell-registry'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'

export interface PreviewValueProps {
  value: Array<{
    type: string
    value: any
  }>
}

const columnHelper = createColumnHelper()

export const PreviewValue = (props: PreviewValueProps): React.JSX.Element => {
  const { value } = props
  const advancedGridCellRegistry = useInjection<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/AdvancedGridCellRegistry'])

  const columns = value.map((item, index) => {
    const isAdvancedCellType = advancedGridCellRegistry.hasDynamicType(item.type)

    return columnHelper.accessor(`${item.type}-${index}`, {
      header: item.type,
      meta: {
        editable: false,
        type: isAdvancedCellType ? item.type : 'dataobject.adapter',
        config: {
          ...(isAdvancedCellType
            ? {}
            : {
                dataObjectType: item.type,
                dataObjectConfig: {}
              })
        }
      }
    })
  })

  const data: Array<Record<string, any>> = []
  const row: Record<string, any> = {}

  // Create a row with the values from the value array
  value.forEach((item, index) => {
    row[`${item.type}-${index}`] = item.value
  })

  data.push(row)

  return (
    <GridContentRenderer>
      <Grid
        autoWidth
        columns={ columns }
        data={ data }
      />
    </GridContentRenderer>
  )
}
