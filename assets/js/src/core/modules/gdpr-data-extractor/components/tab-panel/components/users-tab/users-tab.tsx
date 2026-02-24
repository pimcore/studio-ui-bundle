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
import { type SortFilter } from '@Pimcore/modules/app/types/sort-filter'
import { transformToSortFilter, transformToSortingState } from '@Pimcore/modules/app/utils/sort-filter-helper'

interface UserRow {
  data: {
    id: number
    name: string
    firstname: string
    lastname: string
    email: string
    __gdprIsDeletable: boolean
  }
}

type UserTable = UserRow['data'] & {
  actions: React.JSX.Element
}

export interface UsersTabProps extends GDPRProviderTabProps<UserRow> {
  data: UserRow[]
}

export const UsersTab = ({ data, providerKey, refresh, onSortingChange, ...props }: UsersTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [sortFilter, setSortFilter] = useState<SortFilter>({ key: 'id', direction: 'ASC' })

  const columnHelper = createColumnHelper<UserTable>()
  const columns = [
    columnHelper.accessor('id', {
      header: t('gdpr-extractor.users.table.field.id'),
      size: 80
    }),
    columnHelper.accessor('name', {
      header: t('gdpr-extractor.users.table.field.name')
    }),
    columnHelper.accessor('firstname', {
      header: t('gdpr-extractor.users.table.field.firstname')
    }),
    columnHelper.accessor('lastname', {
      header: t('gdpr-extractor.users.table.field.lastname')
    }),
    columnHelper.accessor('email', {
      header: t('gdpr-extractor.users.table.field.email')
    }),
    columnHelper.accessor('actions', {
      header: t('gdpr-extractor.table.field.actions'),
      size: 60,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Flex>
            <ExportButton
              data-testid={ `gdpr-users-export-${data.id}` }
              id={ data.id }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.users.table.actions.export')
              } }
            />

            <DeleteButton
              data-testid={ `gdpr-users-delete-${data.id}` }
              disabled={ !data.__gdprIsDeletable }
              id={ data.id }
              label={ data.firstname + ' ' + data.lastname }
              providerKey={ providerKey }
              tooltip={ {
                title: t('gdpr-extractor.users.table.actions.delete')
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
      dataTestId="gdpr-users-grid"
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
