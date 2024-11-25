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

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PreviewView } from './preview-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { sidebarManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Content } from '@Pimcore/components/content/content'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { fetchBlobWithPolling } from '@Pimcore/utils/polling-helper'

export interface IVideoContext {
  thumbnail: string
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
  playerPosition: number
  setPlayerPosition: React.Dispatch<React.SetStateAction<number>>

}

export const VideoContext =
  createContext<IVideoContext>({
    thumbnail: '',
    setThumbnail: () => {
    },
    playerPosition: 0,
    setPlayerPosition: () => {
    }
  })

const PreviewContainer = (): React.JSX.Element => {
  const [thumbnail, setThumbnail] = useState<string>('pimcore-system-treepreview')
  const [url, setUrl] = useState<string>('')
  const [playerPosition, setPlayerPosition] = useState<number>(0)
  const { id } = useContext(AssetContext)
  const { isLoading } = useAssetDraft(id)
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  const contextValue = useMemo<IVideoContext>(() => ({
    thumbnail,
    setThumbnail,
    playerPosition,
    setPlayerPosition
  }), [thumbnail, playerPosition])

  const setUrlByThumbnail = (name: string): void => {
    setUrl('')
    const url = `${getPrefix()}/assets/${id}/video/stream/${name}`

    fetchBlobWithPolling({
      url,
      onSuccess: (blob) => {
        const objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      }
    }).catch(console.error)
  }

  useEffect(() => {
    if (isLoading) {
      return
    }
    setUrlByThumbnail(thumbnail)
  }, [thumbnail, isLoading])

  if (isLoading) {
    return <Content loading />
  }

  const poster = `${getPrefix()}/assets/${id}/video/stream/image-thumbnail?width=500&height=500&aspectRatio=true`

  return (
    <VideoContext.Provider value={ contextValue }>
      <ContentLayout renderSidebar={
        <Sidebar
          buttons={ sidebarButtons }
          entries={ sidebarEntries }
        />
      }
      >
        {url === ''
          ? (
            <Content loading />
            )
          : (
            <PreviewView
              poster={ poster }
              src={ url }
            />
            )}

      </ContentLayout>
    </VideoContext.Provider>
  )
}

export { PreviewContainer }
