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
import { createColumnHelper } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExportButton } from '../../../export-button/export-button'
import { type GDPRProviderTabProps } from '../../tab-panel'
import { DeleteButton } from './components/delete-button/delete-button'
import { EmailParametersButton } from './components/email-parameters-button/email-parameters-button'
import { EmailPreviewButton } from './components/email-preview-button/email-preview-button'
import { type SortFilter } from '@Pimcore/modules/app/types/sort-filter'
import { transformToSortFilter, transformToSortingState } from '@Pimcore/modules/app/utils/sort-filter-helper'

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

type EmailsTable = EmailsRow['data']

export interface EmailsTabProps extends GDPRProviderTabProps<EmailsRow> {
}

export const EmailsTab = ({ data, providerKey, onSortingChange, ...props }: EmailsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [sortFilter, setSortFilter] = useState<SortFilter>({ key: 'sentDate', direction: 'ASC' })

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
      header: t('gdpr-extractor.emails.table.field.from')
    }),
    columnHelper.accessor('to', {
      header: t('gdpr-extractor.emails.table.field.to')
    }),
    columnHelper.accessor('cc', {
      header: t('gdpr-extractor.emails.table.field.cc')
    }),
    columnHelper.accessor('bcc', {
      header: t('gdpr-extractor.emails.table.field.bcc')
    }),
    columnHelper.accessor('subject', {
      header: t('gdpr-extractor.emails.table.field.subject')
    }),
    columnHelper.display({
      id: 'actions',
      header: t('gdpr-extractor.table.field.actions'),
      size: 120,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Flex align="center">
            <EmailPreviewButton
              data-testid={ `gdpr-emails-preview-${data.id}` }
              disabled={ !data.hasHtmlLog }
              id={ data.id }
              tooltip={ {
                title: t('gdpr-extractor.emails.table.actions.html')
              } }
            />

            <EmailParametersButton
              data-testid={ `gdpr-emails-parameters-${data.id}` }
              disabled={ !data.hasParameters }
              id={ data.id }
              tooltip={ {
                title: t('gdpr-extractor.emails.table.actions.parameters')
              } }
            />

            <ExportButton
              data-testid={ `gdpr-emails-export-${data.id}` }
              id={ data.id }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.emails.table.actions.export')
              } }
            />

            <DeleteButton
              data-testid={ `gdpr-emails-delete-${data.id}` }
              disabled={ !data.__gdprIsDeletable }
              id={ data.id }
              label={ data.subject ?? data.from }
              providerKey={ providerKey }
              tooltip={ {
                title: t('email-log.tooltip.delete')
              } }
            />
          </Flex>
        )
      }
    })
  ]

  return (
    <Grid
      autoWidth
      columns={ columns }
      data={ data.map((item) => item.data) }
      dataTestId="gdpr-emails-grid"
      enableSorting
      onSortingChange={ (sorting) => {
        const newSorting = transformToSortingState(sorting)!
        setSortFilter(newSorting)
        onSortingChange?.(newSorting)
      } }
      sorting={ transformToSortFilter(sortFilter) }
      { ...props }
    />
  )
}
