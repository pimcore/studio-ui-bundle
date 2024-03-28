import React, { createContext, useEffect, useMemo } from 'react'
import { useAssetDraft } from './hooks/use-asset-draft'
import { FolderContainer } from './types/folder/folder-container'
import { ImageContainer } from './types/image/image-container'
import { useIsAcitveMainWidget } from '../widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from './hooks/use-global-asset-context'

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
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalAssetContext()

  useEffect(() => {
    return () => {
      removeContext()
    }
  }, [])

  useEffect(() => {
    if (isWidgetActive) {
      setContext({ id })
    }

    return () => {
      if (!isWidgetActive) {
        removeContext()
      }
    }
  }, [isWidgetActive])

  return useMemo(() => (
    <AssetContext.Provider value={ { id } }>
      {isError && <div>Error</div>}
      {isLoading && <div>Loading...</div>}

      {!isError && !isLoading && asset !== undefined && asset.type === 'image' && (
        <ImageContainer />
      )}

      {!isError && !isLoading && asset !== undefined && asset.type === 'folder' && (
        <FolderContainer />
      )}
    </AssetContext.Provider>
  ), [id, isLoading, isError, asset?.type])
}

export { AssetContainer }
