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
}

export const TableGrid = (props: TableGridProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()

  const columns: Array<ColumnDef<any>> = []
  for (let i = 0; i < props.cols; i++) {
    columns.push(
      columnHelper.accessor('col-' + i, {
        meta: {
          type: 'text',
          editable: true
        }
      })
    )
  }

  const dataRows: Array<Record<string, string>> = []
  for (let i = 0; i < props.rows; i++) {
    const rowValues = {}
    for (let j = 0; j < props.cols; j++) {
      rowValues['col-' + j] = props.value?.[i]?.[j] ?? ''
    }
    dataRows.push(rowValues)
  }

  return (
    <Grid
      columns={ columns }
      data={ dataRows }
      hideColumnHeaders
      highlightActiveCell
      onActiveCellChange={ props.onActiveCellChange }
      onUpdateCellData={ (data) => {
        const newDataRows = {
          ...dataRows,
          [data.rowIndex]: {
            ...dataRows?.[data.rowIndex],
            [data.columnId]: data.value
          }
        }

        const newValue = Object.values(newDataRows).map(row => Object.values(row))
        props.onChange?.(newValue)
      } }
      resizable
    />
  )
}
