import { Flex } from "@Pimcore/components/flex/flex";
import { Grid } from "@Pimcore/components/grid/grid";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import { useElementHelper } from "@Pimcore/modules/element/hooks/use-element-helper";
import { ElementType } from "@Pimcore/types/enums/element/element-type";
import { Button, DefaultCell } from "@sdk/components";
import { createColumnHelper } from "@tanstack/react-table";
import { isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { BundleApplicationLoggerGetCollectionApiResponse, BundleApplicationLoggerLogEntry } from "../../application-logger-api-slice.gen";

interface TableProps {
  items: BundleApplicationLoggerGetCollectionApiResponse['items']
}

interface BundleApplicationLoggerLogEntryWithActions extends BundleApplicationLoggerLogEntry {
  actions: React.ReactNode
}

export const Table = ({ items }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()

  const columnHelper = createColumnHelper<BundleApplicationLoggerLogEntryWithActions>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('application-logger.columns.timestamp'),
      cell: info => {
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
        const fileObjectBasePath = '/admin/bundle/applicationlogger/log/show-file-object?filePath='

        if (isNil(column.fileObject)) {
          return <></>
        }

        return (
          <Button
            type="link"
            href={fileObjectBasePath + column.fileObject}
            target="_blank"
          >
            {t('open')}
          </Button >
        )
      },
      size: 60
    }),
    columnHelper.accessor('relatedObjectId', {
      header: t('application-logger.columns.related-object-id'),
      cell: info => {
        const column = info.row.original;

        if (isNil(column.relatedObjectId) || isNil(column.relatedObjectType)) {
          return <></>
        }

        return (
          <Button
            type="link"
            onClick={() => {
              openElement({
                id: column.relatedObjectId!,
                type: column.relatedObjectType as ElementType
              }).catch(() => { })
            }}
          >
            {`${column.relatedObjectType} ${column.relatedObjectId}`}
          </Button >
        )
      },
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