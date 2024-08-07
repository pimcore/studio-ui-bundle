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

import React, { createContext, useContext, useMemo, useState } from 'react'
import { PreviewView } from './preview-view'
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { ContentToolbarSidebarView } from '@Pimcore/modules/element/editor/tab-manager/layouts/content-toolbar-sidebar-view'
import { sidebarManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'

export interface IVideoContext {
  thumbnail: string
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
  playerPosition: number
  setPlayerPosition: React.Dispatch<React.SetStateAction<number>>

}

export const VideoContext =
  createContext<IVideoContext>({
    thumbnail: '',
    setThumbnail: () => {},
    playerPosition: 0,
    setPlayerPosition: () => {}
  })

const PreviewContainer = (): React.JSX.Element => {
  const [thumbnail, setThumbnail] = useState<string>('')
  const [playerPosition, setPlayerPosition] = useState<number>(0)
  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetByIdQuery({ id: assetContext.id! })
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  const contextValue = useMemo<IVideoContext>(() => ({
    thumbnail,
    setThumbnail,
    playerPosition,
    setPlayerPosition
  }), [thumbnail, playerPosition])

  return (
    <VideoContext.Provider value={ contextValue }>
      <ContentToolbarSidebarView>
        <PreviewView
          src={ thumbnail === '' ? data!.fullPath! : thumbnail }
        />
        <Sidebar
          buttons={ sidebarButtons }
          entries={ sidebarEntries }
        />
      </ContentToolbarSidebarView>
    </VideoContext.Provider>
  )
}

export { PreviewContainer }
