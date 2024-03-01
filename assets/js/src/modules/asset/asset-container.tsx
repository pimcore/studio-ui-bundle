import React, { createContext } from 'react'
import { useAssetDraft } from './hooks/use-asset-draft'
import { FolderContainer } from './types/folder/folder-container'
import { ImageContainer } from './types/image/image-container'

export interface AssetContainerProps {
  id: number
}

export interface IAssetContext {
  id?: number
}

export const AssetContext = createContext<IAssetContext>({})

const AssetContainer = (props: AssetContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset } = useAssetDraft(id)

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading || asset === undefined) {
    return <div>Loading...</div>
  }

  return (
    <AssetContext.Provider value={{ id }}>
        {asset.type === 'image' && (
          <ImageContainer />
        )}

        {asset.type === 'folder' && (
          <FolderContainer />
        )}
    </AssetContext.Provider>
  )
}

export { AssetContainer }
