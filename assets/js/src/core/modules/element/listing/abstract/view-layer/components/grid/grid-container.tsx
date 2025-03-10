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
import { useSelectedColumns } from '../../../configuration-layer/provider/selected-columns/use-selected-columns'
import { useData } from '../../../data-layer/provider/data/use-data'
import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'
import { useSettings } from '../../../settings/use-settings'

export const GridContainer = (): React.JSX.Element => {
  const { dataQueryResult, dataLoadingState } = useData()
  const { isLoading, isFetching, data } = dataQueryResult!
  const { selectedColumns, encodeColumnIdentifier, decodeColumnIdentifier } = useSelectedColumns()
  const { useGridOptions } = useSettings()
  const { getGridProps, transformGridColumn, transformGridColumnDefinition } = useGridOptions()
  const columnHelper = createColumnHelper()

  const gridColumnDefinition = useMemo(() => {
    const columns: Array<AccessorKeyColumnDef<unknown, never>> = []

    selectedColumns.forEach((column) => {
      columns.push(
        columnHelper.accessor(encodeColumnIdentifier(column), transformGridColumn(column))
      )
    })

    return transformGridColumnDefinition(columns)
  }, [selectedColumns])

  const gridData = useMemo(() => {
    if (data === undefined) {
      return []
    }

    const memoizedData: any[] = []

    for (const row of data.items) {
      if (row.length === 0) {
        return []
      }

      const newRow: Record<string, any> = {}

      newRow.id = row.id
      newRow.isLocked = row.isLocked
      newRow.permissions = row.permissions

      gridColumnDefinition.forEach((column) => {
        if (!('accessorKey' in column)) {
          return
        }

        const accessor: string = column.accessorKey as string
        const currentSelectedColumn = decodeColumnIdentifier(accessor)

        if (currentSelectedColumn === undefined) {
          return
        }

        const rowColumn = row.columns.find((r) => r.key === currentSelectedColumn.key && r.locale === currentSelectedColumn.locale)

        if (rowColumn === undefined) {
          return
        }

        newRow[accessor] = rowColumn.value
      })

      for (const column of row.columns) {
        const isMetaColumn = ['id', 'fullpath'].includes(column.key as string)

        if (isMetaColumn) {
          newRow[column.key] = column.value
        }
      }

      memoizedData.push(newRow)
    }

    return memoizedData
  }, [data, selectedColumns])

  return useMemo(() => (
    <Grid
      columns={ gridColumnDefinition }
      data={ gridData }
      isLoading={ isLoading || isFetching || dataLoadingState !== 'data-available' }
      resizable
      setRowId={ (row) => row.id }
      { ...getGridProps() }
    />
  ), [gridColumnDefinition, gridData, isLoading, isFetching, dataLoadingState, getGridProps])
}
