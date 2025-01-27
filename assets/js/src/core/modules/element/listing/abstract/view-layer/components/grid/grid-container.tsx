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

import React, { useMemo } from 'react'
import { UseSelectedColumns } from '../../../configuration-layer/provider/selected-columns/use-selected-columns'
import { useData } from '../../../data-layer/provider/data/use-data'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'
import { useSettings } from '../../../settings/use-settings'

export const GridContainer = (): React.JSX.Element => {
  const { dataQueryResult } = useData()
  const { selectedColumns } = UseSelectedColumns()
  const { useGridOptions } = useSettings()
  const { getGridProps, transformGridColum, transformGridColumnDefinition } = useGridOptions()
  const columnHelper = createColumnHelper()

  const gridColumnDefinition = useMemo(() => {
    const columns: Array<ColumnDef<unknown, never>> = []

    selectedColumns.forEach((column) => {
      columns.push(
        columnHelper.accessor(column.key, transformGridColum(column))
      )
    })

    return transformGridColumnDefinition(columns)
  }, [selectedColumns])

  const gridData = useMemo(() => {
    if (dataQueryResult === undefined) {
      return []
    }

    return dataQueryResult.data.items.map((row) => {
      if (row.length === 0) {
        return undefined
      }

      const newRow: Record<string, any> = {}

      selectedColumns.forEach((column) => {
        const rowColumn = row.columns.find((r) => r.key === column.key)
        newRow[column.key] = rowColumn.value
      })

      return newRow
    })
  }, [dataQueryResult, selectedColumns])

  return (
    <>
      {(gridData.length === 0 || (gridData.length > 0 && gridData[0] === undefined)) && <div>Loading...</div>}
      {gridData.length > 0 && gridData[0] !== undefined && (
        <Grid
          columns={ gridColumnDefinition }
          data={ gridData }
          resizable
          setRowId={ (row) => row.id }
          { ...getGridProps() }
        />
      )}
    </>
  )
}
