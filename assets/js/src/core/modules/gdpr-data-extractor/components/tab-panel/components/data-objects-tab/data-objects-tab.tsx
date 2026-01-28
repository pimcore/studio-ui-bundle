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
import { DeleteButton } from '../../../delete-button/delete-button'
import { ExportButton } from '../../../export-button/export-button'
import { OpenButton } from '../../../open-button/open-button'
import { type GDPRProviderTabProps } from '../../tab-panel'

interface DataObjectRow {
  data: {
    className: string
    fullPath: string
    id: number
    type: string
    __gdprIsDeletable: boolean
  }
}

type DataObjectTable = DataObjectRow['data'] & {
  actions: React.JSX.Element
}

export interface DataObjectsTabProps extends GDPRProviderTabProps<DataObjectRow> {
}

export const DataObjectsTab = ({ data, providerKey, ...props }: DataObjectsTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<DataObjectTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('gdpr-extractor.data-objects.table.field.type'),
      meta: {
        type: 'element-subtype-icon',
        config: {
          elementType: elementTypes.dataObject
        }
      },
      size: 60
    }),
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.data-objects.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('fullPath', {
      header: t('gdpr-extractor.data-objects.table.field.fullPath'),
      meta: {
        editable: false,
        autoWidth: true,
        type: 'element',
        config: {
          allowedTypes: ['asset', 'document', 'object'],
          showPublishedState: true,
          expectsStringValue: true,
          allowTextInput: true
        }
      }
    }),
    columnHelper.accessor('className', {
      header: t('gdpr-extractor.data-objects.table.field.className')
    }),
    columnHelper.accessor('actions', {
      header: t('gdpr-extractor.table.field.actions'),
      size: 100,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Flex>
            <ExportButton
              id={ data.id }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.data-objects.table.actions.export')
              } }
            />

            <OpenButton
              elementType={ elementTypes.dataObject }
              id={ data.id }
              tooltip={ {
                title: t('gdpr-extractor.data-objects.table.actions.open')
              } }
            />

            <DeleteButton
              disabled={ !data.__gdprIsDeletable }
              elementType={ elementTypes.dataObject }
              id={ data.id }
              label={ data.fullPath }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.data-objects.table.actions.delete')
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
      enableSorting
      { ...props }
    />
  )
}
