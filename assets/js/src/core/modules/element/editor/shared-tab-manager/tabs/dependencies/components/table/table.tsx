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

import { createColumnHelper } from '@tanstack/react-table'
import React from 'react'
import {
  type Dependency,
  type DependencyGetCollectionByElementTypeApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { type GridProps } from '@Pimcore/types/components/types'

type DependencyTable = Dependency & {
  actions: React.JSX.Element
}

interface TableProps {
  isLoading: GridProps['isLoading']
  items: DependencyGetCollectionByElementTypeApiResponse['items']
}

export const Table = ({ items, isLoading }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<DependencyTable>()
  const columns = [
    columnHelper.accessor('subType', {
      header: t('dependencies.columns.subtype'),
      meta: {
        type: 'dependency-type-icon'
      },
      size: 60
    }),
    columnHelper.accessor('path', {
      header: t('dependencies.columns.path'),
      meta: {
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('actions', {
      header: t('dependencies.columns.open'),
      meta: {
        type: 'open-element'
      },
      size: 50
    })
  ]

  return (
    <Grid
      autoWidth
      columns={ columns }
      data={ items }
      isLoading={ isLoading }
      resizable
    />
  )
}
