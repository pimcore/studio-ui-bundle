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
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { type PredefinedPropertyRow, usePredefinedProperty } from '../hooks/use-predefined-property'
import { ContentType } from '../enums/content-type'
import { allLegacyElementTypes, type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'

type PredefinedPropertyWithActions = PredefinedProperty & { actions: React.ReactNode }

interface TableProps {
  predefinedPropertyRows: PredefinedPropertyRow[]
  setPredefinedPropertyRows: React.Dispatch<React.SetStateAction<PredefinedPropertyRow[]>>
}

export const Table = ({ predefinedPropertyRows, setPredefinedPropertyRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updatePropertyById } = usePredefinedProperty()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const columnHelper = createColumnHelper<PredefinedPropertyWithActions>()

  const tableColumns = [
    columnHelper.accessor('name', {
      header: t('properties.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('properties.columns.description'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('key', {
      header: t('properties.columns.key'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('properties.columns.type'),
      meta: { type: 'select', editable: true, config: { options: Object.values(ContentType) } },
      size: 100
    }),
    columnHelper.accessor('data', {
      header: t('properties.columns.data'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('config', {
      header: t('properties.columns.configuration'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('ctype', {
      header: t('properties.columns.content-type'),
      meta: { type: 'select', editable: true, config: { options: allLegacyElementTypes } },
      size: 110
    }),
    columnHelper.accessor('inheritable', {
      header: t('properties.columns.inheritable'),
      size: 95,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setPredefinedPropertyRows={ setPredefinedPropertyRows }
        />
      )
    })
  ]

  const onUpdateCellData = async ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: PredefinedPropertyRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: PredefinedPropertyRow = { ...rowData, [columnId]: value }

    setPredefinedPropertyRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    const { success } = await updatePropertyById(updatedRow.id, updatedRow)

    if (success) setModifiedCells([])
    else {
      setPredefinedPropertyRows(prev =>
        prev.map(row =>
          row.rowId === rowId ? rowData : row
        )
      )
    }
  }

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ predefinedPropertyRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: DataProperty) => row.rowId }
      />
    </div>
  )
}
