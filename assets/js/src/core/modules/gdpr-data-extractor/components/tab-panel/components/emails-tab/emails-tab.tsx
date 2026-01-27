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
import { elementTypes } from '@sdk/modules/data-object'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ExportButton } from '../../../export-button/export-button'
import { type GDPRProviderTabProps } from '../../tab-panel'
import { EmailParametersButton } from './components/email-parameters-button/email-parameters-button'
import { EmailPreviewButton } from './components/email-preview-button/email-preview-button'
import { DeleteButton } from './components/delete-button/delete-button'

interface EmailsRow {
  data: {
    id: number
    from: string
    to: string
    cc: string
    bcc: string
    sentDate: string
    subject: string
    hasHtmlLog: boolean
    hasParameters: boolean
    __gdprIsDeletable: boolean
  }
}

type EmailsTable = EmailsRow['data'] & {
  actions: React.JSX.Element
}

export interface EmailsTabProps extends GDPRProviderTabProps<EmailsRow> {
}

export const EmailsTab = ({ data, providerKey, ...props }: EmailsTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<EmailsTable>()
  const columns = [
    columnHelper.accessor('sentDate', {
      header: t('gdpr-extractor.emails.table.field.sentDate'),
      meta: {
        type: 'datetime',
        config: {
          showTime: true
        }
      }
    }),
    columnHelper.accessor('from', {
      header: t('gdpr-extractor.emails.table.field.from'),
    }),
    columnHelper.accessor('to', {
      header: t('gdpr-extractor.emails.table.field.to'),
    }),
    columnHelper.accessor('cc', {
      header: t('gdpr-extractor.emails.table.field.cc'),
    }),
    columnHelper.accessor('bcc', {
      header: t('gdpr-extractor.emails.table.field.bcc'),
    }),
    columnHelper.accessor('subject', {
      header: t('gdpr-extractor.emails.table.field.subject'),
    }),
    columnHelper.accessor('actions', {
      header: t('gdpr-extractor.table.field.actions'),
      size: 120,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Flex align="center">
            <EmailPreviewButton
              id={data.id}
              disabled={data.hasHtmlLog === false}
              tooltip={{
                title: t('gdpr-extractor.emails.table.actions.html')
              }}
            />

            <EmailParametersButton
              id={data.id}
              disabled={data.hasParameters === false}
              tooltip={{
                title: t('gdpr-extractor.emails.table.actions.parameters')
              }}
            />

            <ExportButton
              tooltip={{
                title: t('gdpr-extractor.emails.table.actions.export')
              }}
              id={data.id}
              providerKey={providerKey}
            />

            <DeleteButton
              tooltip={{
                title: t('email-log.tooltip.delete')
              }}
              disabled={!data.__gdprIsDeletable}
              elementType={elementTypes.dataObject}
              id={data.id}
              label={data.subject ?? data.from}
            />
          </Flex>
        )
      }
    })
  ]

  return (
    <Grid
      autoWidth
      columns={columns}
      data={data.map((item) => item.data)}
      enableSorting
      {...props}
    />
  )
}
