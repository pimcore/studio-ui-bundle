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
import { Grid } from '@Pimcore/components/grid/grid'
import { useStyle } from './table.styles'

type DependencyTable = Dependency & {
  actions: React.JSX.Element
}

export const Table = ({ items }: Pick<GetDependenciesApiResponse, 'items'>): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  const columnHelper = createColumnHelper<DependencyTable>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.dependencies.columns.subtype'),
      meta: {
        type: 'asset-property-icon'
      },
      size: 70
    }),
    columnHelper.accessor('path', {
      header: t('asset.asset-editor-tabs.dependencies.columns.path'),
      size: 300
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.dependencies.columns.open'),
      meta: {
        type: 'open-element'
      },
      size: 50
    })
  ]

  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ items }
      />
    </div>
  )
}
