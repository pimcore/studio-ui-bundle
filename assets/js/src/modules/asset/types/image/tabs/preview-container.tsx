import React, { useContext } from 'react'
import { PreviewView } from './preview-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import { useApiAssetsIdGetQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useApiAssetsIdGetQuery({ id: assetContext.id!.toString() })

  return (
    <PreviewView src={data!.fullPath!} />
  )
}

export { PreviewContainer }
