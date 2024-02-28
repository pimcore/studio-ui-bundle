import React, { useContext } from 'react'
import { Image } from 'antd'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

export const ViewTabContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { isError, isLoading, asset } = useAssetDraft(assetContext.id)

  if (isLoading || asset === undefined) {
    return <h4>Loading...</h4>
  }

  if (isError) {
    return <h4>Error</h4>
  }

  if (asset.type === 'image') {
    return (
      <>
        <Image src={asset.fullPath} />
      </>
    )
  }

  return <div>view</div>
}
