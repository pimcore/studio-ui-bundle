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

import React from 'react'
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
}

export const TableGrid = (props: TableGridProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()

  const columns: Array<ColumnDef<any>> = []
  if (props.columnConfigActivated && props.columnConfig !== undefined) {
    props.columnConfig.forEach((col, index) => {
      columns.push(
        columnHelper.accessor(col.key, {
          header: col.label ?? col.key,
          id: String(col.key),
          size: 150,
          meta: {
            autoWidth: true,
            type: 'text',
            editable: props.disabled !== true
          }
        })
      )
    })
  } else {
    for (let i = 0; i < props.cols; i++) {
      columns.push(
        columnHelper.accessor('col-' + i, {
          id: 'col-' + i,
          size: 150,
          meta: {
            autoWidth: true,
            type: 'text',
            editable: props.disabled !== true
          }
        })
      )
    }
  }

  const dataRows: Array<Record<string, string>> = []
  for (let i = 0; i < props.rows; i++) {
    const rowValues: Record<string, string> = {}
    if (props.columnConfigActivated && props.columnConfig !== undefined) {
      props.columnConfig.forEach((col, index) => {
        rowValues[col.key] = props.value?.[i]?.[col.key] ?? ''
      })
    } else {
      for (let j = 0; j < props.cols; j++) {
        rowValues['col-' + j] = props.value?.[i]?.[j] ?? ''
      }
    }
    dataRows.push(rowValues)
  }

  return (
    <Grid
      columns={ columns }
      data={ dataRows }
      disabled={ props.disabled }
      hideColumnHeaders={ !props.columnConfigActivated || props.columnConfig === undefined }
      highlightActiveCell={ props.disabled !== true }
      onActiveCellChange={ props.onActiveCellChange }
      onUpdateCellData={ (data) => {
        const newDataRows = [...dataRows]
        newDataRows[data.rowIndex] = {
          ...newDataRows[data.rowIndex],
          [data.columnId]: data.value
        }

        const newValue = props.columnConfigActivated && props.columnConfig !== undefined
          ? newDataRows
          : newDataRows.map(row => Object.values(row))

        props.onChange?.(newValue)
      } }
      resizable
    />
  )
}
