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
import { type GetAssetsApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface GridContainerProps {
  assets: GetAssetsApiResponse
}

const GridContainer = (props: GridContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<GetAssetsApiResponse['items']>()

  const columns = [
    columnHelper.accessor('imageThumbnailPath', {
      header: t('asset.asset-editor-tabs.list.columns.preview'),
      meta: {
        type: 'asset-preview'
      },
      id: 'preview',
      size: 110
    }),

    columnHelper.accessor('id', {
      header: t('asset.asset-editor-tabs.list.columns.id')
    }),

    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.list.columns.type')
    }),

    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.fullPath'),
      id: 'fullPath',
      meta: {
        type: 'asset-link'
      },
      size: 300
    }),

    columnHelper.accessor('creationDate', {
      header: t('asset.asset-editor-tabs.list.columns.creationDate'),
      meta: {
        type: 'date'
      }
    }),

    columnHelper.accessor('modificationDate', {
      header: t('asset.asset-editor-tabs.list.columns.modificationDate'),
      meta: {
        type: 'date'
      }
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ assets.items }
      resizable
    />
  )
}

export { GridContainer }
