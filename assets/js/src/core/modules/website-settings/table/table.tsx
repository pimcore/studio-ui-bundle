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
import { type SelectOption, type WebsiteSettingRow } from '../website-settings-container'
import { useWebsiteSetting } from '../hooks/use-website-settings'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { type Site } from '@Pimcore/modules/document/sites-slice.gen'
import { isUndefined } from 'lodash'

type WebsiteSettingEnrichedRow = WebsiteSettingRow & {
  siteDomain: string
}

export type WebsiteSettingEnrichedWithActions = WebsiteSettingEnrichedRow & {
  actions: React.ReactNode
}

interface TableProps {
  websiteSettingRows: WebsiteSettingRow[]
  setWebsiteSettingRows: React.Dispatch<React.SetStateAction<WebsiteSettingRow[]>>
  typeSelectOptions: SelectOption[]
}

export const Table = ({ websiteSettingRows, setWebsiteSettingRows, typeSelectOptions }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateSettingById } = useWebsiteSetting()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const { getAllSites, getSiteById } = useSites()

  const tableData: WebsiteSettingEnrichedRow[] = websiteSettingRows.map((row: WebsiteSettingEnrichedRow) => {
    if (row.siteId == null) {
      return {
        ...row,
        siteDomain: ''
      }
    }

    const site = getSiteById(row.siteId)
    const domain = !isUndefined(site) ? site.domain : ''

    return {
      ...row,
      siteDomain: domain
    }
  })

  const availableSites: Site[] = getAllSites()
  const siteDomains = availableSites.map(site => site.domain)

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

  const columnHelper = createColumnHelper<WebsiteSettingEnrichedWithActions>()

  const tableColumns = [
    columnHelper.accessor('type', {
      header: t('website-settings.columns.type'),
      meta: { type: 'select', editable: true, config: { options: typeSelectOptions } },
      size: 80
    }),
    columnHelper.accessor('name', {
      header: t('website-settings.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('language', {
      header: t('website-settings.columns.language'),
      meta: {
        type: 'language-select',
        editable: true
      },
      size: 60
    }),
    columnHelper.accessor('data', {
      header: t('website-settings.columns.value'),
      meta: {
        type: 'element',
        editable: true,
        clearable: true
      },
      size: 150
    }),
    columnHelper.accessor('siteDomain', {
      header: t('website-settings.columns.site'),
      meta: { type: 'select', editable: true, config: { options: Object.values(siteDomains) } },
      size: 110
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 60,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setWebsiteSettingRows={ setWebsiteSettingRows }
        />
      )
    })
  ]

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ tableData }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: WebsiteSettingRow) => row.rowId }
      />
    </div>
  )
}
