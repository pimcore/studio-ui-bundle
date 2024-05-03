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
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { Tag } from 'antd'
import { PreviewContainer } from './grid-columns/preview-container'
import { useTranslation } from 'react-i18next'
import { type Asset, type GetAssetsApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface GridContainerProps {
  assets: GetAssetsApiResponse
}

const GridContainer = (props: GridContainerProps): React.JSX.Element => {
  const { assets } = props
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<Asset>()

  const columns = [
    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.preview'),
      cell: info => {
        if (info.row.original.type !== 'image') {
          return <></>
        }

        return <PreviewContainer cellInfo={ info } />
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
      cell: info => (
        <Tag
          bordered={ false }
          color='processing'
        >{info.getValue()!}</Tag>
      ),
      id: 'fullPath',
      size: 300
    }),

    columnHelper.accessor('creationDate', {
      header: t('asset.asset-editor-tabs.list.columns.creationDate'),
      cell: info => <FormattedDate timestamp={ info.getValue()! * 1000 } />
    }),

    columnHelper.accessor('modificationDate', {
      header: t('asset.asset-editor-tabs.list.columns.modificationDate'),
      cell: info => <FormattedDate timestamp={ info.getValue()! * 1000 } />
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ assets.items! }
      resizable
    />
  )
}

export { GridContainer }
