/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type UserWorkspace } from '@Pimcore/modules/user/user-api-slice.gen'
interface ITableProps {
  data: UserWorkspace[]
  isLoading: boolean
}

export const Table = ({
  data,
  isLoading
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper()
  const createColumns = (): any => [
    columnHelper.accessor('id', {
      header: t('user-management.references.columns.id'),
      meta: {
        type: 'element-cell',
        editable: false
      },
      size: 184
    }),
    columnHelper.accessor('cpath', {
      header: t('user-management.references.columns.cpath'),
      meta: {
        type: 'element-cell',
        editable: false,
        autoWidth: true
      },
      size: 270
    }),
    columnHelper.accessor('subtype', {
      header: t('user-management.references.columns.subtype'),
      meta: {
        type: 'element-cell',
        editable: false
      },
      size: 184
    })
  ]
  const ownTableColumns = [
    ...createColumns()
  ]

  return (
    <Grid
      autoWidth
      columns={ ownTableColumns }
      data={ data }
      isLoading={ isLoading }
      resizable
      setRowId={ (row) => row.cid }
    />
  )
}
