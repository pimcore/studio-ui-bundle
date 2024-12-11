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
import { Grid } from '@Pimcore/components/grid/grid'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import {
  type TableValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/table/table'

interface TableGridProps {
  cols: number | null
  rows: number | null
  value: TableValue | null
  onChange?: (value: TableValue | null) => void
}

export const TableGrid = (props: TableGridProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()

  const cols = props.cols ?? 5
  const rows = props.rows ?? 7

  const columns: Array<ColumnDef<any>> = []
  for (let i = 0; i < cols; i++) {
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
  for (let i = 0; i < rows; i++) {
    const rowValues = {}
    for (let j = 0; j < cols; j++) {
      rowValues['col-' + j] = props.value?.[i]?.[j] ?? ''
    }
    dataRows.push(rowValues)
  }

  return (
    <Grid

      columns={ columns }
      data={ dataRows }
      hideColumnHeaders
      onUpdateCellData={ (data) => {
        const newDataRows = {
          ...dataRows,
          [data.rowIndex]: {
            ...dataRows?.[data.rowIndex],
            [data.columnId]: data.value
          }
        }

        const newValue = Object.values(newDataRows).map(row => Object.values(row))
        console.log('new value', newValue, newDataRows)
        props.onChange?.(newValue)
      } }
      resizable
    />
  )
}
