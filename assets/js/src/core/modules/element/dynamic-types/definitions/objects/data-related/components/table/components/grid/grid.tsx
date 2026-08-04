/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { Grid, type GridCellReference } from '@Pimcore/components/grid/grid'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { type TableValue } from '../../hooks/use-table-value'

interface TableGridProps {
  cols: number
  rows: number
  value: TableValue | null
  onActiveCellChange?: (activeCell?: GridCellReference) => void
  onChange?: (value: TableValue | null) => void
  disabled?: boolean
  columnConfigActivated: boolean
  columnConfig?: Array<{ key: string, label: string }>
  className?: string
}

export const TableGrid = (props: TableGridProps): React.JSX.Element => {
  const { columnConfigActivated, columnConfig, disabled, cols, rows, value, onChange } = props

  const columns: Array<ColumnDef<any>> = useMemo(() => {
    const columnHelper = createColumnHelper()
    const result: Array<ColumnDef<any>> = []

    if (columnConfigActivated && columnConfig !== undefined) {
      columnConfig.forEach((col) => {
        result.push(
          columnHelper.accessor(String(col.key), {
            header: col.label ?? col.key,
            id: String(col.key),
            size: 150,
            meta: {
              autoWidth: true,
              type: 'text',
              editable: disabled !== true
            }
          })
        )
      })
    } else {
      for (let i = 0; i < cols; i++) {
        result.push(
          columnHelper.accessor('col-' + i, {
            id: 'col-' + i,
            size: 150,
            meta: {
              autoWidth: true,
              type: 'text',
              editable: disabled !== true
            }
          })
        )
      }
    }

    return result
  }, [columnConfigActivated, columnConfig, disabled, cols])

  const dataRows: Array<Record<string, string>> = useMemo(() => {
    const result: Array<Record<string, string>> = []
    for (let i = 0; i < rows; i++) {
      const rowValues: Record<string, string> = {}
      if (columnConfigActivated && columnConfig !== undefined) {
        columnConfig.forEach((col) => {
          rowValues[col.key] = value?.[i]?.[col.key] ?? ''
        })
      } else {
        for (let j = 0; j < cols; j++) {
          rowValues['col-' + j] = value?.[i]?.[j] ?? ''
        }
      }
      result.push(rowValues)
    }
    return result
  }, [rows, cols, columnConfigActivated, columnConfig, value])

  const onUpdateCellData = useCallback((data: { rowIndex: number, columnId: string, value: any }) => {
    const newDataRows = [...dataRows]
    newDataRows[data.rowIndex] = {
      ...newDataRows[data.rowIndex],
      [data.columnId]: data.value
    }

    const newValue = columnConfigActivated && columnConfig !== undefined
      ? newDataRows
      : newDataRows.map(row => Object.values(row))

    onChange?.(newValue)
  }, [dataRows, columnConfigActivated, columnConfig, onChange])

  return (
    <Grid
      className={ props.className }
      columns={ columns }
      data={ dataRows }
      disabled={ disabled }
      hideColumnHeaders={ !columnConfigActivated || columnConfig === undefined }
      highlightActiveCell={ disabled !== true }
      onActiveCellChange={ props.onActiveCellChange }
      onUpdateCellData={ onUpdateCellData }
      resizable
    />
  )
}
