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
import { WebsiteSettingRow } from '../website-settings-container'
import { WebsiteSetting } from '../website-settings-api-slice-enhanced'
import { useWebsiteSetting } from '../hooks/use-website-settings'

export type WebsiteSettingWithActions = WebsiteSetting & { actions: React.ReactNode }

interface TableProps {
  websiteSettingRows: WebsiteSettingRow[]
  setWebsiteSettingRows: React.Dispatch<React.SetStateAction<WebsiteSettingRow[]>>
}

export const Table = ({ websiteSettingRows, setWebsiteSettingRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSettingById } = useWebsiteSetting()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const columnHelper = createColumnHelper<WebsiteSettingWithActions>()

  const tableColumns = [
    columnHelper.accessor('type', {
      header: t('website-settings.columns.type'),
      meta: { editable: true},
      size: 80
    }),
    columnHelper.accessor('name', {
      header: t('website-settings.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('language', {
      header: t('website-settings.columns.language'),
      meta: { editable: true },
      size: 100
    }),
    columnHelper.accessor('data', {
      header: t('website-settings.columns.value'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('siteId', {
      header: t('website-settings.columns.site'),
      meta: { editable: true },
      size: 110
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setWebsiteSettingRows={ setWebsiteSettingRows }
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
    rowData: WebsiteSettingRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: WebsiteSettingRow = { ...rowData, [columnId]: value }

    setWebsiteSettingRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    const { success } = await updateSettingById(updatedRow.id, updatedRow)

    if (success) setModifiedCells([])
    else {
      setWebsiteSettingRows(prev =>
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
        data={ websiteSettingRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: WebsiteSettingRow) => row.rowId }
      />
    </div>
  )
}
