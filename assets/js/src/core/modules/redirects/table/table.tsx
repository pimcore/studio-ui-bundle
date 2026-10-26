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
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type RedirectRow, useRedirects } from '../hooks/use-redirects'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import {
  useRedirectTypeOptions,
  useRedirectStatusOptions,
  useRedirectPriorityOptions,
  useRedirectTargetTypeOptions
} from '../hooks/use-redirect-options'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { type Site } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { isElementReference } from '@Pimcore/modules/element/element-helper'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { isNil, isUndefined } from 'lodash'

type RedirectWithActions = RedirectRow & { actions: React.ReactNode }

interface TableProps {
  onSortingChange?: (sorting: SortingState) => void
  sorting?: SortingState
  redirectRows: RedirectRow[]
  setRedirectRows: React.Dispatch<React.SetStateAction<RedirectRow[]>>
}

export const Table = ({ onSortingChange, sorting, redirectRows, setRedirectRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { updateRedirectById } = useRedirects()
  const { getAllSites } = useSites()

  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])

  const availableSites: Site[] = getAllSites()
  const siteOptions = availableSites.map(site => ({
    value: site.id,
    label: t(site.domain)
  }))

  const columnHelper = createColumnHelper<RedirectWithActions>()

  const tableColumns = useMemo(() => [
    columnHelper.accessor('type', {
      header: t('redirects.type'),
      meta: {
        type: 'select',
        editable: true,
        config: { useOptionsHook: () => useRedirectTypeOptions() }
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
      meta: {
        editable: true,
        type: 'element',
        config: {
          allowedTypes: ['asset', 'data-object', 'document'],
          showPublishedState: false,
          allowTextInput: true,
          // the row keeps the target as a path, so the tag icon comes from the target type
          getElementInfo: (cellProps: DefaultCellProps) => ({
            fullPath: String(cellProps.getValue() ?? ''),
            elementType: mapToElementType(
              (cellProps.row.original as RedirectRow).targetType ?? 'document'
            ) ?? undefined
          })
        }
      },
      size: 200
    }),
    columnHelper.accessor('targetType', {
      header: t('redirects.target-type'),
      meta: {
        type: 'select',
        editable: true,
        config: { useOptionsHook: () => useRedirectTargetTypeOptions() }
      },
      size: 110
    }),
    columnHelper.accessor('statusCode', {
      header: t('redirects.status'),
      meta: {
        type: 'select',
        editable: true,
        config: { useOptionsHook: () => useRedirectStatusOptions() }
      },
      size: 100
    }),
    columnHelper.accessor('priority', {
      header: t('redirects.priority'),
      meta: {
        type: 'select',
        editable: true,
        config: { useOptionsHook: () => useRedirectPriorityOptions() }
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
    columnHelper.accessor('expiry', {
      header: t('redirects.expiry'),
      size: 80,
      meta: { type: 'date', editable: true }
    }),
    columnHelper.accessor('actions', {
      header: t('redirects.actions'),
      size: 80,
      enableSorting: false,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setRedirectRows={ setRedirectRows }
        />
      )
    })
  ], [siteOptions, t])

  const getUpdatedRow = (columnId: string, value: unknown, rowData: RedirectRow): RedirectRow => {
    if (columnId !== 'target') {
      return { ...rowData, [columnId]: value }
    }

    // dropping an element onto the target cell also tells us which element type it is
    if (isElementReference(value)) {
      return { ...rowData, target: value.fullPath, targetType: value.type }
    }

    // a manually entered path is resolved by the server against the row's target type;
    // the server clears the type itself when the target turns out not to be an element
    return { ...rowData, target: isNil(value) ? null : String(value) }
  }

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
    const updatedRow = getUpdatedRow(columnId, value, rowData)

    setRedirectRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    if (updatedRow.id !== null) {
      const { success, data } = await updateRedirectById(updatedRow.id, updatedRow)

      if (success) {
        setModifiedCells([])

        // the server resolves the target against the target type, so take over its result
        if (!isUndefined(data)) {
          setRedirectRows(prev =>
            prev.map(row =>
              row.rowId === rowId ? { ...data, rowId } : row
            )
          )
        }
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
    <Grid
      autoWidth
      columns={ tableColumns }
      data={ redirectRows }
      enableSorting
      modifiedCells={ modifiedCells }
      onSortingChange={ onSortingChange }
      onUpdateCellData={ onUpdateCellData }
      resizable
      setRowId={ (row: RedirectRow) => row.rowId }
      sorting={ sorting }
    />
  )
}
