/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type QuantityValueUnit } from '@Pimcore/modules/data-object/unit-slice-enhanced'
import { type QuantityValueUnitRow, useQuantityValueUnit } from '../hooks/use-quantity-value-unit'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { useBaseUnitSelectOptions } from '../hooks/use-base-unit-select-options'

type QuantityValueUnitWithActions = QuantityValueUnit & { actions: React.ReactNode }

interface TableProps {
  quantityValueUnitRows: QuantityValueUnitRow[]
  setQuantityValueUnitRows: React.Dispatch<React.SetStateAction<QuantityValueUnitRow[]>>
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
}

export const Table = ({ quantityValueUnitRows, setQuantityValueUnitRows, sorting, onSortingChange }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateUnitById } = useQuantityValueUnit()
  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])

  const columnHelper = createColumnHelper<QuantityValueUnitWithActions>()

  const tableColumns = useMemo(() => [
    columnHelper.accessor('id', {
      header: t('quantity-values.columns.id'),
      meta: { editable: false },
      size: 100
    }),
    columnHelper.accessor('abbreviation', {
      header: t('quantity-values.columns.abbreviation'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('longName', {
      header: t('quantity-values.columns.long-name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('baseUnit', {
      header: t('quantity-values.columns.base-unit'),
      meta: {
        type: 'select',
        editable: true,
        config: {
          useOptionsHook: () => useBaseUnitSelectOptions(),
          allowClear: true
        }
      },
      size: 120
    }),
    columnHelper.accessor('factor', {
      header: t('quantity-values.columns.factor'),
      meta: { type: 'number', editable: true },
      size: 120
    }),
    columnHelper.accessor('conversionOffset', {
      header: t('quantity-values.columns.conversion-offset'),
      meta: { type: 'number', editable: true },
      enableSorting: false,
      size: 150
    }),
    columnHelper.accessor('converter', {
      header: t('quantity-values.columns.converter'),
      meta: { editable: true },
      enableSorting: false,
      size: 150
    }),
    columnHelper.accessor('actions', {
      header: t('quantity-values.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setQuantityValueUnitRows={ setQuantityValueUnitRows }
        />
      )
    })
  ], [])

  const onUpdateCellData = async ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: QuantityValueUnitRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: QuantityValueUnitRow = { ...rowData, [columnId]: value }

    setQuantityValueUnitRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    if (updatedRow.id === null) return

    const { success } = await updateUnitById(updatedRow.id, updatedRow)

    if (success) setModifiedCells([])
    else {
      setQuantityValueUnitRows(prev =>
        prev.map(row =>
          row.rowId === rowId ? rowData : row
        )
      )
    }
  }

  return (
    <Grid
      autoWidth
      columns={ tableColumns }
      data={ quantityValueUnitRows }
      enableSorting
      manualSorting
      modifiedCells={ modifiedCells }
      onSortingChange={ onSortingChange }
      onUpdateCellData={ onUpdateCellData }
      resizable
      setRowId={ (row: QuantityValueUnitRow) => row.rowId }
      sorting={ sorting }
    />
  )
}
