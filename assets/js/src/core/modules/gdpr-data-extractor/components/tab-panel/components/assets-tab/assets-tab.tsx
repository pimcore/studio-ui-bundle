/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type GDPRProviderTabProps } from '../../tab-panel'
import { Flex } from '@Pimcore/components/flex/flex'
import { ExportButton } from '../../../export-button/export-button'
import { OpenButton } from '../../../open-button/open-button'
import { DeleteButton } from '../../../delete-button/delete-button'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

interface AssetRow {
  data: {
    type: string
    id: number
    fullPath: string
    subType: string
    __gdprIsDeletable: boolean
  }
}

type AssetTable = AssetRow['data'] & {
  actions: React.JSX.Element
}

export interface AssetsTabProps extends GDPRProviderTabProps<AssetRow> {
  data: AssetRow[]
}

export const AssetsTab = ({ data, providerKey, ...props }: AssetsTabProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<AssetTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('gdpr-extractor.assets.table.field.type'),
      meta: {
        type: 'element-subtype-icon'
      },
      size: 60
    }),
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.assets.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('fullPath', {
      header: t('gdpr-extractor.assets.table.field.fullPath'),
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
    columnHelper.accessor('subType', {
      header: t('gdpr-extractor.assets.table.field.subType')
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
                title: t('gdpr-extractor.assets.table.actions.export')
              } }
            />

            <OpenButton
              elementType={ elementTypes.asset }
              id={ data.id }
              tooltip={ {
                title: t('gdpr-extractor.assets.table.actions.open')
              } }
            />

            <DeleteButton
              disabled={ !data.__gdprIsDeletable }
              elementType={ elementTypes.asset }
              id={ data.id }
              label={ data.fullPath }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.assets.table.actions.delete')
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
