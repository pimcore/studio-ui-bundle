/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type RedirectRow, useRedirects } from '../hooks/use-redirects'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import {
  useBundleSeoRedirectListTypesQuery,
  useBundleSeoRedirectListStatusesQuery,
  useBundleSeoRedirectListPrioritiesQuery
} from '../seo-api-slice.gen'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { Site } from '@Pimcore/modules/document/sites-slice.gen'

type RedirectWithActions = RedirectRow & { actions: React.ReactNode }

interface TableProps {
  redirectRows: RedirectRow[]
  setRedirectRows: React.Dispatch<React.SetStateAction<RedirectRow[]>>
}

export const Table = ({ redirectRows, setRedirectRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateRedirectById } = useRedirects()
  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])

  const { data: typesData } = useBundleSeoRedirectListTypesQuery()
  const { data: statusesData } = useBundleSeoRedirectListStatusesQuery()
  const { data: prioritiesData } = useBundleSeoRedirectListPrioritiesQuery()
  const { getAllSites } = useSites()

    const availableSites: Site[] = getAllSites()
    const siteOptions = availableSites.map(site => ({
      value: site.id,
      label: t(site.domain)
    }))
    
  const typeOptions = useMemo(() => 
    typesData?.types?.map(type => ({ label: t(type), value: type })) ?? [], 
    [typesData]
  )

  const statusOptions = useMemo(() => 
    statusesData?.statuses?.map(status => ({ 
      label: `${status.code} - ${status.label}`, 
      value: status.code 
    })) ?? [], 
    [statusesData]
  )

  const priorityOptions = useMemo(() => 
    prioritiesData?.priorities?.map(priority => ({ 
      label: priority.toString(), 
      value: priority 
    })) ?? [], 
    [prioritiesData]
  )

  const columnHelper = createColumnHelper<RedirectWithActions>()

  const tableColumns = [
    columnHelper.accessor('type', {
      header: t('redirects.type'),
      meta: { 
        type: 'select', 
        editable: true, 
        config: { options: typeOptions } 
      },
      size: 120
    }),
    columnHelper.accessor('sourceSite', {
      header: t('redirects.source-site'),
     meta: { 
        type: 'select', 
        editable: true, 
        config: { options: siteOptions } 
      },
      size: 100
    }),
    columnHelper.accessor('source', {
      header: t('redirects.source'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('targetSite', {
      header: t('redirects.target-site'),
      meta: { 
        type: 'select', 
        editable: true, 
        config: { options: siteOptions } 
      },
            size: 100
    }),
    columnHelper.accessor('target', {
      header: t('redirects.target'),
      meta: { editable: true, type: 'element' },
      size: 200
    }),
    columnHelper.accessor('statusCode', {
      header: t('redirects.status'),
      meta: { 
        type: 'select', 
        editable: true, 
        config: { options: statusOptions } 
      },
      size: 100
    }),
    columnHelper.accessor('priority', {
      header: t('redirects.priority'),
      meta: { 
        type: 'select', 
        editable: true, 
        config: { options: priorityOptions } 
      },
      size: 80
    }),
    columnHelper.accessor('regex', {
      header: t('redirects.regex'),
      size: 80,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('passThroughParameters', {
      header: t('redirects.pass-through'),
      size: 110,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('active', {
      header: t('redirects.active'),
      size: 80,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('actions', {
      header: t('redirects.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setRedirectRows={ setRedirectRows }
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
    rowData: RedirectRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: RedirectRow = { ...rowData, [columnId]: value }

    setRedirectRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    if (updatedRow.id !== null) {
      const { success } = await updateRedirectById(updatedRow.id, updatedRow)

      if (success) {
        setModifiedCells([])
      } else {
        setRedirectRows(prev =>
          prev.map(row =>
            row.rowId === rowId ? rowData : row
          )
        )
      }
    }
  }

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ redirectRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: RedirectRow) => row.rowId }
      />
    </div>
  )
}
