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

import React, { useEffect } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type DependencyToAnObject } from '@Pimcore/modules/user/user-api-slice.gen'

interface ITableProps {
  data: DependencyToAnObject[]
  isLoading: boolean
}

export const Table = ({
  data,
  isLoading
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [gridData, setGridData] = React.useState<DependencyToAnObject[]>(data)

  useEffect(() => {
    setGridData(data)
  }, [data])

  const columnHelper = createColumnHelper()
  const createColumns = (): any => [
    columnHelper.accessor('id', {
      header: t('user-management.workspaces.columns.id'),
      meta: {
        type: 'element-cell',
        editable: true
      },
      size: 100
    }),
    columnHelper.accessor('path', {
      header: t('user-management.workspaces.columns.path'),
      meta: {
        type: 'element-cell',
        editable: true,
        autoWidth: true
      }
    }),
    columnHelper.accessor('subtype', {
      header: t('user-management.workspaces.columns.subtype'),
      meta: {
        type: 'element-cell',
        editable: true
      },
      size: 150
    })
  ]
  const ownTableColumns = [
    ...createColumns()
  ]

  return (
    <Grid
      autoWidth
      columns={ ownTableColumns }
      data={ gridData }
      isLoading={ isLoading }
      resizable
      setRowId={ (row) => row.cid }
    />
  )
}
