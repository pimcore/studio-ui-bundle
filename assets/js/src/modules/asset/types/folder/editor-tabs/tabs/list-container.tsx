import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { Grid } from '@Pimcore/components/grid/grid'
import { type AssetJsonldAssetReadDependencyReadPropertyRead, useApiAssetsGetCollectionQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import { ImageView } from '@Pimcore/modules/asset/grid/columns/views/image-view'
import { createColumnHelper } from '@tanstack/react-table'
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
  const columnHelper = createColumnHelper<AssetJsonldAssetReadDependencyReadPropertyRead>()

  const columns = [
    columnHelper.accessor('fullPath', {
      header: t('asset.asset-editor-tabs.list.columns.preview'),
      cell: info => <ImageView src={info.getValue() as string} />,
      size: 110
    }),

    columnHelper.accessor('id', {
      header: t('asset.asset-editor-tabs.list.columns.id')
    }),

    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.list.columns.type')
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
    <Grid data={assets} columns={columns} />
  )
}

export { ListContainer }
