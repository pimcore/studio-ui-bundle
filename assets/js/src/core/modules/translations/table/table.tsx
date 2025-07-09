/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { TranslationRow } from '../translations-container'

type TranslationWithActions = TranslationRow & { actions: React.ReactNode }

interface TableProps {
  translationRows: TranslationRow[]
  setTranslationRows: React.Dispatch<React.SetStateAction<TranslationRow[]>>
}

export const Table = ({ translationRows, setTranslationRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  // const { updateTranslationByKey } = useTranslations()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const columnHelper = createColumnHelper<TranslationWithActions>()

  const tableColumns = [
    columnHelper.accessor('key', {
      header: t('translations.columns.key'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('translations.columns.type'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setTranslationRows={ setTranslationRows }
        />
      )
    })
  ]

  const onUpdateCellData = ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: TranslationRow
  }): void => { 
    console.log("update", { columnId, value, rowData })
  }

  // const onUpdateCellData = async ({
  //   columnId,
  //   value,
  //   rowData
  // }: {
  //   columnId: string
  //   value: unknown
  //   rowData: TranslationRow
  // }): Promise<void> => {
  //   const rowId = rowData.rowId
  //   const updatedRow: TranslationRow = { ...rowData, [columnId]: value }

  //   setTranslationRows(prev =>
  //     prev.map(row =>
  //       row.rowId === rowId ? updatedRow : row
  //     )
  //   )

  //   setModifiedCells([{ columnId, rowIndex: rowId }])

  //   const { success } = await updateTranslationByKey(updatedRow.key, updatedRow)

  //   if (success) setModifiedCells([])
  //   else {
  //     setTranslationRows(prev =>
  //       prev.map(row =>
  //         row.rowId === rowId ? rowData : row
  //       )
  //     )
  //   }
  // }

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ translationRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: TranslationRow) => row.rowId }
      />
    </div>
  )
}
