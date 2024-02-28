import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { Grid } from '@Pimcore/components/grid/grid'
import { type AssetJsonldAssetReadDependencyReadPropertyReadRead, useApiAssetsGetCollectionQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import { ImageView } from '@Pimcore/modules/asset/grid/columns/views/image-view'
import { createColumnHelper } from '@tanstack/react-table'
import { Tag } from 'antd'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

const ListContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { t } = useTranslation()
  const assetId = assetContext.id
  const { isLoading, isError, data } = useApiAssetsGetCollectionQuery({ parentId: parseInt(assetId) })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const assets = data['hydra:member']
  const columnHelper = createColumnHelper<AssetJsonldAssetReadDependencyReadPropertyReadRead>()

  const columns = [
    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.preview'),
      cell: info => {
        if (info.row.original.type !== 'image') {
          return <></>
        }

        return <ImageView src={info.getValue()!} />
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
      cell: info => <Tag bordered={false} color='processing'>{info.getValue()!}</Tag>,
      id: 'fullPath',
      size: 300
    }),

    columnHelper.accessor('creationDate', {
      header: t('asset.asset-editor-tabs.list.columns.creationDate'),
      cell: info => <FormattedDate timestamp={info.getValue() as number * 1000} />
    }),

    columnHelper.accessor('modificationDate', {
      header: t('asset.asset-editor-tabs.list.columns.modificationDate'),
      cell: info => <FormattedDate timestamp={info.getValue() as number * 1000} />
    })
  ]

  return (
    <Grid data={assets} columns={columns} resizeable />
  )
}

export { ListContainer }
