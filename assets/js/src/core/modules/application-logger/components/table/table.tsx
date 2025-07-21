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
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { Button } from '@sdk/components'
import { createColumnHelper } from '@tanstack/react-table'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type BundleApplicationLoggerGetCollectionApiResponse, type BundleApplicationLoggerLogEntry } from '../../application-logger-api-slice.gen'
import { DetailModal } from '../detail-modal/detail-modal'

interface TableProps {
  items: BundleApplicationLoggerGetCollectionApiResponse['items']
}

export interface BundleApplicationLoggerLogEntryWithActions extends BundleApplicationLoggerLogEntry {
  translatedPriority: string
  actions: React.ReactNode
}

export const Table = ({ items }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()
  const [open, setOpen] = useState<boolean>(false)
  const [modelData, setModelData] = useState<BundleApplicationLoggerLogEntryWithActions | null>(null)

  const openModal = (data: BundleApplicationLoggerLogEntryWithActions): void => {
    setModelData(data)
    setOpen(true)
  }

  const tableItems = items.map((item) => {
    return {
      ...item,
      date: formatDateTime({ timestamp: item.date, dateStyle: 'short', timeStyle: 'short' }),
      translatedPriority: t(`application-logger.filter.priority-level.${item.priority}`)
    }
  })

  const columnHelper = createColumnHelper<BundleApplicationLoggerLogEntryWithActions>()
  const columns = [
    columnHelper.accessor('date', {
      header: t('application-logger.columns.timestamp'),
      size: 80
    }),
    columnHelper.accessor('pid', {
      header: t('application-logger.columns.pid'),
      size: 60
    }),
    columnHelper.accessor('message', {
      header: t('application-logger.columns.message')
    }),
    columnHelper.accessor('translatedPriority', {
      header: t('application-logger.columns.type'),
      size: 60
    }),
    columnHelper.accessor('fileObject', {
      header: t('application-logger.columns.file-object'),
      cell: ({ row }): React.JSX.Element => {
        const column = row.original
        const fileObjectBasePath = '/admin/bundle/applicationlogger/log/show-file-object?filePath='

        if (isNil(column.fileObject)) {
          return <></>
        }

        return (
          <Button
            href={ fileObjectBasePath + column.fileObject }
            target="_blank"
            type="link"
          >
            {t('open')}
          </Button >
        )
      },
      size: 60
    }),
    columnHelper.accessor('relatedElementData', {
      header: t('application-logger.columns.related-object'),
      cell: ({ row }): React.JSX.Element => {
        const column = row.original

        if (isNil(column.relatedElementData)) {
          return <></>
        }

        const element = column.relatedElementData

        return (
          <Button
            onClick={ () => {
              openElement({
                id: element.id,
                type: (element.type === 'object' ? 'data-object' : element.type) as ElementType
              }).catch(() => { })
            } }
            type="link"
          >
            {`${element.type} ${element.id}`}
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
      cell: ({ row }): React.JSX.Element => {
        const column = row.original

        return (
          <Flex
            align='center'
            className='w-full'
          >
            <IconButton
              icon={ { value: 'expand-01' } }
              onClick={ async () => {
                openModal(column)
              } }
              type="link"
            />
          </Flex>
        )
      },
      size: 40
    })
  ]

  return (
    <>
      <Grid
        autoWidth
        columns={ columns }
        data={ tableItems }
        // isLoading={notesAndEventsFetching}
        modifiedCells={ [] }
        resizable
      />

      <DetailModal
        data={ modelData }
        open={ open }
        setOpen={ setOpen }
      />
    </>
  )
}
