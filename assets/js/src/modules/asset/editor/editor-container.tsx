import React, { useEffect, useMemo } from 'react'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { FolderContainer } from './folder/folder-container'
import { ImageContainer } from './image/image-container'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { AssetContext } from '../asset-context'
import { VideoContainer } from './video/video-container'
import { DocumentContainer } from '@Pimcore/modules/asset/editor/document/document-container'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
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

      {!isError && !isLoading && asset !== undefined && asset.type === 'video' && (
        <VideoContainer />
      )}

      {!isError && !isLoading && asset !== undefined && asset.type === 'document' && (
        <DocumentContainer />
      )}

      {!isError && !isLoading && asset !== undefined && asset.type === 'folder' && (
        <FolderContainer />
      )}
    </AssetContext.Provider>
  ), [id, isLoading, isError, asset?.type])
}

export { EditorContainer }
