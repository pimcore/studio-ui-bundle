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

import React, { useCallback, useMemo } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { type ColumnDef, createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type GetAssetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useListColumns, useListSelectedRows, useListSorting } from './hooks/use-list'

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
  const { sorting, setSorting } = useListSorting()

  const onSelectedRowsChange = useCallback((rows: RowSelectionState): void => {
    setSelectedRows(rows)
  }, [])

  const onUpdateCellData = useCallback(() => {}, [])

  const columns = useMemo(() => {
    const columns: Array<ColumnDef<unknown, never>> = []

    GridColumns.forEach((column) => {
      columns.push(
        columnHelper.accessor(column.key, {
          header: t(`asset.listing.column.${column.key}`),
          enableSorting: column.sortable,
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
        enableSorting: false,
        meta: {
          type: 'asset-actions'
        },
        size: 65
      })
    )

    return columns
  }, [GridColumns])

  const data: TransformedGridData = useMemo(() => {
    return assets?.items.map(item => {
      const row = {}
      item?.columns?.forEach(column => {
        row[column.key!] = column.value
      })
      return row
    })
  }, [assets])

  return useMemo(() => {
    if (data === undefined) {
      return <></>
    }

    return (
      <Grid
        columns={ columns }
        data={ data }
        enableMultipleRowSelection
        enableSorting
        manualSorting
        onSelectedRowsChange={ onSelectedRowsChange }
        onSortingChange={ setSorting }
        onUpdateCellData={ onUpdateCellData }
        resizable
        selectedRows={ selectedRows }
        setRowId={ (row: AssetRow) => row.id }
        sorting={ sorting }
      />
    )
  }, [columns, data, selectedRows, onSelectedRowsChange, onUpdateCellData, sorting])
}

export { GridContainer }
