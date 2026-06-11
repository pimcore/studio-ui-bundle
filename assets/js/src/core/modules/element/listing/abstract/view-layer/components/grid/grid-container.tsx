/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { type SelectedColumn } from '../../../configuration-layer/provider/selected-columns/selected-columns-provider'
import { useSelectedColumns } from '../../../configuration-layer/provider/selected-columns/use-selected-columns'
import { useData } from '../../../data-layer/provider/data/use-data'
import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Grid } from '@Pimcore/components/grid/grid'
import { type ColumnResizeEndEvent } from '@Pimcore/types/components/types'
import { useSettings } from '../../../settings/use-settings'

export const GridContainer = (): React.JSX.Element => {
  const { dataQueryResult, dataLoadingState } = useData()
  const { isLoading, isFetching, data } = dataQueryResult!
  const { selectedColumns, setSelectedColumns, encodeColumnIdentifier, decodeColumnIdentifier, shouldMapDataToColumn } = useSelectedColumns()
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

        const rowColumn = row.columns.find((r) => shouldMapDataToColumn(r, currentSelectedColumn))

        if (rowColumn === undefined) {
          return
        }

        newRow[accessor] = rowColumn.value
        newRow['__api-data'] = row
      })

      memoizedData.push(newRow)
    }

    return memoizedData
  }, [data, selectedColumns])

  const handleColumnResizeEnd = useCallback((event: ColumnResizeEndEvent): void => {
    const widthByColumn = new Map<SelectedColumn, number>()

    for (const [columnId, width] of Object.entries(event.columnSizing)) {
      const selectedColumn = decodeColumnIdentifier(columnId)

      if (!isUndefined(selectedColumn)) {
        widthByColumn.set(selectedColumn, Math.round(width))
      }
    }

    // the column that was just resized wins over stale entries from previous column identifier generations
    const resizedColumn = decodeColumnIdentifier(event.columnId)

    if (!isUndefined(resizedColumn)) {
      widthByColumn.set(resizedColumn, Math.round(event.width))
    }

    let hasChanges = false
    const newSelectedColumns = selectedColumns.map((column) => {
      const width = widthByColumn.get(column)

      if (isUndefined(width) || column.width === width) {
        return column
      }

      hasChanges = true
      return { ...column, width }
    })

    if (hasChanges) {
      setSelectedColumns(newSelectedColumns)
    }
  }, [selectedColumns, decodeColumnIdentifier, setSelectedColumns])

  return useMemo(() => (
    <Grid
      columns={ gridColumnDefinition }
      data={ gridData }
      isLoading={ isLoading || isFetching || dataLoadingState !== 'data-available' }
      onColumnResizeEnd={ handleColumnResizeEnd }
      resizable
      setRowId={ (row) => row.id }
      { ...getGridProps() }
    />
  ), [gridColumnDefinition, gridData, isLoading, isFetching, dataLoadingState, getGridProps, handleColumnResizeEnd])
}
