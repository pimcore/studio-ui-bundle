/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { buildTestId } from '@Pimcore/utils/test-id-generator'
import { formatDateTime } from '@sdk/utils'
import { createColumnHelper, type RowSelectionState, type SortingState } from '@tanstack/react-table'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectedRowsContext } from '../../context/selected-items-context'
import { type OwnershipConfiguration } from '../../ownership-management-api-slice.gen'
import { useStyles } from './table.styles'

export interface TableProps {
  items: OwnershipConfiguration[]
  onReassign: (ids: string[]) => void
  onDelete: (ids: string[]) => void
  sorting: SortingState
  onSortingChange: (sorting: SortingState) => void
}

interface OwnershipConfigurationRow extends OwnershipConfiguration {
  modificationDateLabel: string
  actions: React.ReactNode
}

export const Table = (props: TableProps): React.JSX.Element => {
  const { items, onReassign, onDelete, sorting, onSortingChange } = props
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { selectedRows, setSelectedRows } = useSelectedRowsContext()

  const tableItems: OwnershipConfigurationRow[] = items.map((item) => ({
    ...item,
    modificationDateLabel: isNil(item.modificationDate)
      ? '-'
      : formatDateTime({ timestamp: item.modificationDate, dateStyle: 'short', timeStyle: 'short' }),
    actions: null
  }))

  const columnHelper = createColumnHelper<OwnershipConfigurationRow>()
  const columns = [
    columnHelper.accessor('id', {
      header: t('ownership-management.columns.id'),
      size: 70
    }),
    columnHelper.accessor('name', {
      header: t('ownership-management.columns.name'),
      meta: {
        autoWidth: true
      }
    }),
    columnHelper.accessor('modificationDateLabel', {
      header: t('ownership-management.columns.modification-date'),
      size: 170
    }),
    columnHelper.accessor('ownerName', {
      header: t('ownership-management.columns.owner'),
      cell: ({ row }): React.JSX.Element => {
        const { ownerDeleted, ownerId, ownerName } = row.original

        return (
          <div className={ styles.ownerCell }>
            {ownerDeleted
              ? (
                <span className={ styles.deletedOwner }>
                  { `${ownerId} (${t('ownership-management.deleted-user')})` }
                </span>
                )
              : (<span>{ `${ownerId} (${ownerName})` }</span>)}

            <IconButton
              data-testid={ buildTestId(['button', 'reassign-owner']) }
              icon={ { value: 'edit' } }
              onClick={ () => { onReassign([row.original.id]) } }
              tooltip={ { title: t('ownership-management.actions.reassign-owner') } }
              type="link"
            />
          </div>
        )
      },
      size: 200
    }),
    columnHelper.accessor('actions', {
      header: t('ownership-management.columns.actions'),
      enableSorting: false,
      cell: ({ row }): React.JSX.Element => {
        return (
          <Flex
            align="center"
            justify="center"
          >
            <IconButton
              data-testid={ buildTestId(['button', 'delete']) }
              icon={ { value: 'trash' } }
              onClick={ () => { onDelete([row.original.id]) } }
              tooltip={ { title: t('ownership-management.actions.delete') } }
              type="link"
            />
          </Flex>
        )
      },
      size: 80
    })
  ]

  return (
    <Grid
      autoWidth
      columns={ columns }
      data={ tableItems }
      enableMultipleRowSelection
      enableSorting
      manualSorting
      modifiedCells={ [] }
      onSelectedRowsChange={ (row: RowSelectionState) => { setSelectedRows(row) } }
      onSortingChange={ onSortingChange }
      resizable
      selectedRows={ selectedRows }
      setRowId={ (row) => String(row.id) }
      sorting={ sorting }
    />
  )
}
