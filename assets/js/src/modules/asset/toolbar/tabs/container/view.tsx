import React, { useContext } from 'react'
import { Image } from 'antd'
import { AssetContext } from '@Pimcore/modules/asset/context/asset-context'

export const ViewTab = (): React.JSX.Element => {
  const asset = useContext(AssetContext)

  if (asset === null) {
    return <h4>Oh Snap, something went wrong!</h4>
  }

  return (
      <Image src={asset.fullPath} />
  )
}
