import { Flex } from "@Pimcore/components/flex/flex"
import { DefaultCellProps } from "@Pimcore/components/grid/columns/default-cell"
import { Grid } from "@Pimcore/components/grid/grid"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Icon } from "@Pimcore/components/icon/icon"
import { ElementInfo } from "@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/element-cell/element-cell"
import { formatDateTime } from "@sdk/utils"
import { createColumnHelper, RowSelectionState } from "@tanstack/react-table"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRecycleBin } from "../../hooks/use-recycle-bin"
import { RecycleBin } from "../../recycle-bin-api-slice.gen"
import { useStyles } from "./table.styles"

interface TableProps {
  items: RecycleBin[]
}

interface RecycleBinWithActions extends RecycleBin {
  actions: React.ReactNode
}

export const Table = ({ items }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { restoreItems, removeItems } = useRecycleBin()
  const [restoreLoading, setRestoreLoading] = useState<boolean>(false)
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<RowSelectionState | undefined>(undefined)

  const tableItems = items.map((item) => {
    return {
      ...item,
      date: formatDateTime({
        timestamp: item.date,
        dateStyle: 'short',
        timeStyle: 'short'
      }),
    }
  })

  const columnHelper = createColumnHelper<RecycleBinWithActions>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('recycle-bin.columns.type'),
      cell: ({ row }) => {
        const type = row.original.type

        const getElementTypeIcon = () => {
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
            justify='center'
            className={styles.icons}
          >
            {getElementTypeIcon()}
          </Flex>
        )
      },
      size: 20,
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
              fullPath: row.path,
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
              icon={{ value: 'restore' }}
              onClick={() => {
                setRestoreLoading(true)
                restoreItems([row.original.id], () => {
                  setRestoreLoading(false)
                })
              }}
              loading={restoreLoading}
              type="link"
            />

            <IconButton
              icon={{ value: 'trash' }}
              onClick={() => {
                setRemoveLoading(true)
                removeItems([row.original.id], () => {
                  setRemoveLoading(false)
                })
              }}
              loading={removeLoading}
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
      columns={columns}
      data={tableItems}
      modifiedCells={[]}
      resizable
      enableMultipleRowSelection
      onSelectedRowsChange={(row: RowSelectionState) => { setSelectedItems(row) }}
      selectedRows={selectedItems}
    />
  )
}