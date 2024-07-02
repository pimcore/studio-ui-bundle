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
  type GetDependenciesApiResponse
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Grid } from '@Pimcore/components/grid/grid'

type DependencyTable = Dependency & {
  actions: React.JSX.Element
}

export const Table = ({ items, totalItems }: GetDependenciesApiResponse): React.JSX.Element => {
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<DependencyTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.dependencies.columns.subtype'),
      meta: {
        type: 'asset-property-icon'
      }
    }),
    columnHelper.accessor('path', {
      header: t('asset.asset-editor-tabs.dependencies.columns.path')
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.dependencies.columns.open'),
      cell: (info) => {
        return (
          <Icon name={ 'group' } />
        )
      }
    })
  ]

  return (
    <>
      {totalItems === 0 && (
        <p>Sorry, all beers have been drunk</p>
      )}

      {totalItems > 0 && (
        <Grid
          columns={ columns }
          data={ items }
        />
      )}
    </>
  )
}
