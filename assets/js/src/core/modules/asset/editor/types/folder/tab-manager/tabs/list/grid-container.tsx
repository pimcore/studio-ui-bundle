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
import { type ColumnDef, createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type GetAssetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useListColumns, useListSelectedRows } from './hooks/use-list'

interface GridContainerProps {
  assets: GetAssetGridApiResponse | undefined
}

type AssetRow = Record<string, any>
type TransformedGridData = AssetRow[] | undefined

const GridContainer = (props: GridContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const columnHelper = createColumnHelper()
  const { columns: GridColumns } = useListColumns()
  const { selectedRows, setSelectedRows } = useListSelectedRows()

  const columns: Array<ColumnDef<unknown, never>> = []

  GridColumns.forEach((column) => {
    columns.push(
      columnHelper.accessor(column.key, {
        header: t(`asset.listing.column.${column.key}`),
        meta: {
          type: column.frontendType,
          editable: column.editable,
          config: column.config
        }
      })
    )
  })

  columns.push(
    columnHelper.accessor('actions', {
      header: t('actions.open'),
      meta: {
        type: 'asset-actions'
      },
      size: 65
    })
  )

  const data: TransformedGridData = assets?.items.map(item => {
    const row = {}
    item?.columns?.forEach(column => {
      row[column.key!] = column.value
    })
    return row
  })

  if (data === undefined) {
    return <></>
  }

  return (
    <Grid
      columns={ columns }
      data={ data }
      enableMultipleRowSelection
      onSelectedRowsChange={ onSelectedRowsChange }
      onUpdateCellData={ () => {} }
      resizable
      selectedRows={ selectedRows }
    />
  )

  function onSelectedRowsChange (rows: RowSelectionState): void {
    setSelectedRows(rows)
  }
}

export { GridContainer }
