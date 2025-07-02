import React from "react";
import { BundleApplicationLoggerGetCollectionApiResponse, BundleApplicationLoggerLogEntry } from "../../application-logger-api-slice.gen";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import { Flex } from "@Pimcore/components/flex/flex";
import { Grid } from "@Pimcore/components/grid/grid";
import { Default } from "@Pimcore/components/iframe/iframe.stories";
import { Button, DefaultCell } from "@sdk/components";
import { isNil } from "lodash";

interface TableProps {
  items: BundleApplicationLoggerGetCollectionApiResponse['items']
}

interface BundleApplicationLoggerLogEntryWithActions extends BundleApplicationLoggerLogEntry {
  actions: React.ReactNode
}

export const Table = ({ items }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<BundleApplicationLoggerLogEntryWithActions>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('application-logger.columns.timestamp'),
      cell: info => {
        const column = info.row.original;

        return (
          <DefaultCell {...info} />
        )
      },
      size: 120
    }),
    columnHelper.accessor('pid', {
      header: t('application-logger.columns.pid'),
      size: 60
    }),
    columnHelper.accessor('message', {
      header: t('application-logger.columns.message')
    }),
    columnHelper.accessor('fileObject', {
      header: t('application-logger.columns.file-object'),
      cell: info => {
        const column = info.row.original;

        if (isNil(column.fileObject)) {
          return <></>
        }

        return (
          <Button
            type="link"
            href={column.fileObject}
            target="_blank"
          >
            {t('open')}
          </Button>
        )
      },
      size: 60
    }),
    columnHelper.accessor('relatedObjectId', {
      header: t('application-logger.columns.related-object-id'),
      size: 60
    }),
    columnHelper.accessor('component', {
      header: t('application-logger.columns.component'),
      size: 100
    }),
    columnHelper.accessor('source', {
      header: t('application-logger.columns.source')
    }),
    columnHelper.accessor('actions', {
      header: t('application-logger.columns.details'),
      cell: ({ row }) => {
        const column = row.original;

        return (
          <Flex
            align='center'
            className='w-full'
          >
            <IconButton
              icon={{ value: 'expand-01' }}
              onClick={async () => {
                console.log('open detail modal for ', column.id)
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
      data={items}
      //isLoading={notesAndEventsFetching}
      modifiedCells={[]}
      resizable
    />
  );
}