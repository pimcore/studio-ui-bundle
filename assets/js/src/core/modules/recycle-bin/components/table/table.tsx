import { Flex } from "@Pimcore/components/flex/flex"
import { Grid } from "@Pimcore/components/grid/grid"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { formatDateTime } from "@sdk/utils"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"
import { useTranslation } from "react-i18next"
import { RecycleBin } from "../../recycle-bin-api-slice.gen"
import { useRecycleBin } from "../../hooks/use-recycle-bin"
import { Icon } from "@Pimcore/components/icon/icon"
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
    }),
    columnHelper.accessor('amount', {
      header: t('recycle-bin.columns.amount'),
      size: 40
    }),
    columnHelper.accessor('deletedBy', {
      header: t('recycle-bin.columns.deleted-by'),
      size: 60
    }),
    columnHelper.accessor('date', {
      header: t('recycle-bin.columns.date'),
      size: 60
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
              onClick={async () => {
                restoreItems([row.original.id], () => {
                  //TODO: add cache clear or refetch logic
                })
              }}
              type="link"
            />

            <IconButton
              icon={{ value: 'trash' }}
              onClick={async () => {
                removeItems([row.original.id], () => {
                  //TODO: add cache clear or refetch logic
                })
              }}
              type="link"
            />
          </Flex>
        )
      },
      size: 30
    })
  ]


  return (
    <Grid
      autoWidth
      columns={columns}
      data={tableItems}
      modifiedCells={[]}
      resizable
    />
  )
}