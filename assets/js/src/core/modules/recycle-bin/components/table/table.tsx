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
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ElementInfo } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/element-cell/element-cell'
import { formatDateTime } from '@sdk/utils'
import { createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecycleBin } from '../../hooks/use-recycle-bin'
import { type RecycleBin } from '../../recycle-bin-api-slice.gen'
import { useStyles } from './table.styles'
import { useSelectedRowsContext } from '../../context/selected-items-context'

interface TableProps {
  items: RecycleBin[]
}

interface RecycleBinWithActions extends RecycleBin {
  actions: React.ReactNode
}

export const Table = ({ items }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [restoreLoading, setRestoreLoading] = useState<number[]>([])
  const [removeLoading, setRemoveLoading] = useState<number[]>([])
  const { restoreItems, removeItems } = useRecycleBin()
  const { selectedRows, setSelectedRows } = useSelectedRowsContext()

  const tableItems = items.map((item) => {
    return {
      ...item,
      date: formatDateTime({
        timestamp: item.date,
        dateStyle: 'short',
        timeStyle: 'short'
      })
    }
  })

  const columnHelper = createColumnHelper<RecycleBinWithActions>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('recycle-bin.columns.type'),
      cell: ({ row }) => {
        const type = row.original.type

        const getElementTypeIcon = (): React.JSX.Element => {
          switch (type) {
            case 'document':
              return <Icon value="document" />
            case 'asset':
              return <Icon value="asset" />
            case 'object':
              return <Icon value="data-object" />
            default:
              return <></>
          }
        }

        return (
          <Flex
            align='center'
            className={ styles.icons }
            justify='center'
          >
            {getElementTypeIcon()}
          </Flex>
        )
      },
      size: 20
    }),
    columnHelper.accessor('path', {
      header: t('recycle-bin.columns.path'),
      meta: {
        editable: false,
        clearable: false,
        type: 'element',
        config: {
          getElementInfo: (cellProps: DefaultCellProps): ElementInfo => {
            const row = cellProps.row.original
            return {
              fullPath: row.path
            }
          }
        }
      }
    }),
    columnHelper.accessor('amount', {
      header: t('recycle-bin.columns.amount'),
      size: 20
    }),
    columnHelper.accessor('deletedBy', {
      header: t('recycle-bin.columns.deleted-by'),
      size: 60
    }),
    columnHelper.accessor('date', {
      header: t('recycle-bin.columns.date'),
      size: 40
    }),
    columnHelper.accessor('actions', {
      header: t('recycle-bin.columns.actions'),
      cell: ({ row }): React.JSX.Element => {
        return (
          <Flex
            align='center'
            justify='center'
          >
            <IconButton
              icon={ { value: 'restore' } }
              loading={ restoreLoading.includes(row.original.id) }
              onClick={ () => {
                setRestoreLoading((prev) => [...prev, row.original.id])
                void restoreItems([row.original.id], () => {
                  setRestoreLoading((prev) => prev.filter(id => id !== row.original.id))
                })
              } }
              type="link"
            />

            <IconButton
              icon={ { value: 'trash' } }
              loading={ removeLoading.includes(row.original.id) }
              onClick={ () => {
                setRemoveLoading(prev => [...prev, row.original.id])
                void removeItems([row.original.id], () => {
                  setRemoveLoading(prev => prev.filter(id => id !== row.original.id))
                })
              } }
              type="link"
            />
          </Flex>
        )
      },
      size: 20
    })
  ]

  return (
    <Grid
      autoWidth
      columns={ columns }
      data={ tableItems }
      enableMultipleRowSelection
      modifiedCells={ [] }
      onSelectedRowsChange={ (row: RowSelectionState) => { setSelectedRows(row) } }
      resizable
      selectedRows={ selectedRows }
      setRowId={ (row) => String(row.id) }
    />
  )
}
