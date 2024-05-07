import React, { useContext } from 'react'
import { PreviewView } from './preview-view'
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-context'
import { useStyle } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/preview/preview-container.styles'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetByIdQuery({ id: assetContext.id! })
  const { styles } = useStyle()

  return (
    <div className={ styles.relativeContainer }>
      <PreviewView
        src={ data!.fullPath! }
      />
    </div>
  )
}

export { PreviewContainer }
