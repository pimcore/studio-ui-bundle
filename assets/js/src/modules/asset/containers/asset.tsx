import React from 'react'
import { Image } from 'antd'
import { useAssetDraft } from '../hooks/use-asset-draft'

export interface AssetProps {
  id: string
}

const Asset = (props: AssetProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset } = useAssetDraft(id)

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading || asset === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {asset.filename}

      {asset.type === 'image' && (
        <Image src={asset.fullPath} />
      )}
    </div>
  )
}

export { Asset }
