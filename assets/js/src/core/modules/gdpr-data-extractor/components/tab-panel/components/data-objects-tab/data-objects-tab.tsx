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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteButton } from '../../../delete-button/delete-button'
import { ExportButton } from '../../../export-button/export-button'
import { OpenButton } from '../../../open-button/open-button'
import { type GDPRProviderTabProps } from '../../tab-panel'
import { type SortFilter } from '@Pimcore/modules/app/types/sort-filter'
import { transformToSortFilter, transformToSortingState } from '@Pimcore/modules/app/utils/sort-filter-helper'

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

export const DataObjectsTab = ({ data, providerKey, onSortingChange, ...props }: DataObjectsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [sortFilter, setSortFilter] = useState<SortFilter>({ key: 'id', direction: 'ASC' })

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
              data-testid={ `gdpr-data-objects-export-${data.id}` }
              id={ data.id }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.data-objects.table.actions.export')
              } }
            />

            <OpenButton
              data-testid={ `gdpr-data-objects-open-${data.id}` }
              elementType={ elementTypes.dataObject }
              id={ data.id }
              tooltip={ {
                title: t('gdpr-extractor.data-objects.table.actions.open')
              } }
            />

            <DeleteButton
              data-testid={ `gdpr-data-objects-delete-${data.id}` }
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
      dataTestId="gdpr-data-objects-grid"
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
