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
  type StructuredTableCol,
  type StructuredTableColType, type StructuredTableColumnValue,
  type StructuredTableRow,
  type StructuredTableValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/structured-table/structured-table'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

interface StructuredTableGridProps {
  castColumnValue: (value: StructuredTableColumnValue, key: string) => StructuredTableColumnValue
  cols: StructuredTableCol[]
  disabled?: boolean
  rows: StructuredTableRow[]
  labelWidth: number | null
  labelFirstCell: string | null
  value: StructuredTableValue | null
  onChange?: (value: StructuredTableValue | null) => void
}

export const StructuredTableGrid = (props: StructuredTableGridProps): React.JSX.Element => {
  const columnHelper = createColumnHelper()
  const { t } = useTranslation()

  const mapColType = (type: StructuredTableColType): string => {
    switch (type) {
      case 'text':
        return 'text'
      case 'bool':
        return 'checkbox'
      case 'number':
        return 'number'
      default:
        return 'text'
    }
  }

  const applyColWidth = (colWidth?: number | null): number => {
    return Number(colWidth) > 0 ? Number(colWidth) : 100
  }

  const columns: Array<ColumnDef<any>> = [
    columnHelper.accessor('rowLabel', {
      header: !_.isEmpty(props.labelFirstCell) ? t(props.labelFirstCell!) : '',
      size: applyColWidth(props.labelWidth)
    })
  ]
  props.cols.forEach((col) => {
    columns.push(
      columnHelper.accessor(col.key !== '' ? col.key : col.position.toString(), {
        header: col.label !== '' ? t(col.label) : col.position.toString(),
        size: applyColWidth(col.width),
        meta: {
          type: mapColType(col.type),
          editable: props.disabled !== true,
          autoWidth: true
        }
      })
    )
  })

  const rows = props.rows.map((row) => {
    const rowData = {
      rowLabel: t(row.label)
    }
    props.cols.forEach((col) => {
      rowData[col.key] = props.castColumnValue(props.value?.[row.key]?.[col.key] ?? null, col.key)
    })
    return rowData
  })

  return (
    <Grid
      columns={ columns }
      data={ rows }
      disabled={ props.disabled }
      onUpdateCellData={ (data) => {
        const newValue = {
          ...props.value,
          [props.rows[data.rowIndex].key]: {
            ...props.value?.[props.rows[data.rowIndex].key],
            [data.columnId]: props.castColumnValue(data.value as StructuredTableColumnValue, data.columnId)
          }
        }

        props.onChange?.(newValue)
      } }
      resizable
    />
  )
}
