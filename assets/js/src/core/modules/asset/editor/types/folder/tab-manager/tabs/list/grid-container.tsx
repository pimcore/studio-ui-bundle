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
import { Grid, type GridProps } from '@Pimcore/components/grid/grid'
import { type ColumnDef, createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type GridColumnConfiguration, type AssetGetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useListColumns, useListSelectedRows, useListSorting } from './hooks/use-list'
import { uuid } from '@Pimcore/utils/uuid'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'

interface GridContainerProps {
  assets: AssetGetGridApiResponse | undefined
  modifiedCells: GridProps['modifiedCells']
  onUpdateCellData: (data: Record<string, any>) => void
}

type AssetRow = Record<string, any>
type TransformedGridData = AssetRow[] | undefined

export interface ColumnIdentifier extends Pick<GridColumnConfiguration, 'key' | 'locale'> {
  id: string
}

export const createColumnIdentifier = (column: GridColumnConfiguration): ColumnIdentifier => {
  return {
    id: uuid(),
    key: column.key,
    locale: column.locale
  }
}

export const decodeColumnIdentifier = (columnIdentifier: ColumnIdentifier): string => {
  return JSON.stringify(columnIdentifier)
}

export const encodeColumnIdentifier = (columnIdentifier: string): ColumnIdentifier => {
  return JSON.parse(columnIdentifier)
}

const GridContainer = (props: GridContainerProps): React.JSX.Element => {
  const { assets, onUpdateCellData } = props
  const { t } = useTranslation()
  const columnHelper = createColumnHelper()
  const { columns: GridColumns } = useListColumns()
  const { selectedRows, setSelectedRows } = useListSelectedRows()
  const { sorting, setSorting } = useListSorting()
  const { hasType } = useDynamicTypeResolver()

  const onSelectedRowsChange = useCallback((rows: RowSelectionState): void => {
    setSelectedRows(rows)
  }, [])

  const [columns, columnIdentifiers] = useMemo(() => {
    const columns: Array<ColumnDef<unknown, never>> = []
    const columnIdentifiers: ColumnIdentifier[] = []

    GridColumns.forEach((column) => {
      const columnIdentifier = createColumnIdentifier(column)
      columnIdentifiers.push(columnIdentifier)
      const columnIdentifierString = decodeColumnIdentifier(columnIdentifier)

      columns.push(
        columnHelper.accessor(columnIdentifierString, {
          header: t(`asset.listing.column.${column.key}`).concat(column.locale !== undefined && column.locale !== null ? ` (${column.locale})` : ''),
          enableSorting: column.sortable,
          meta: {
            type: hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.type] }) ? column.type : column.frontendType,
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

    return [columns, columnIdentifiers]
  }, [GridColumns])

  const data: TransformedGridData = useMemo(() => {
    if (assets === undefined) {
      return undefined
    }

    const transformedData: AssetRow[] = []

    assets.items.forEach((item) => {
      const row: AssetRow = {}
      columnIdentifiers.forEach((columnIdentifier) => {
        const columnIdentifierString = decodeColumnIdentifier(columnIdentifier)

        item.columns?.forEach((column) => {
          if (column.key === 'id') {
            row.id = column.value
          }

          if (column.key === columnIdentifier.key && column.locale === columnIdentifier.locale) {
            row[columnIdentifierString] = column.value
          }
        })
      })
      transformedData.push(row)
    })

    return transformedData
  }, [assets, columnIdentifiers])

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
        modifiedCells={ props.modifiedCells }
        onSelectedRowsChange={ onSelectedRowsChange }
        onSortingChange={ setSorting }
        onUpdateCellData={ onUpdateCellData }
        resizable
        selectedRows={ selectedRows }
        setRowId={ (row: AssetRow) => row.id }
        sorting={ sorting }
      />
    )
  }, [data, columnIdentifiers, selectedRows, onSelectedRowsChange, onUpdateCellData, sorting])
}

export { GridContainer }
