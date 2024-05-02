/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import React, { useEffect, useMemo } from 'react'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { FolderContainer } from './folder/folder-container'
import { ImageContainer } from './image/image-container'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { AssetContext } from '../asset-context'

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

      {!isError && !isLoading && asset !== undefined && asset.type === 'folder' && (
        <FolderContainer />
      )}
    </AssetContext.Provider>
  ), [id, isLoading, isError, asset?.type])
}

export { EditorContainer }
