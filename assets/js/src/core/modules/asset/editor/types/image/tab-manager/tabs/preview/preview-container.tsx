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
import { type Image, useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  ContentToolbarSidebarView
} from '@Pimcore/modules/element/editor/tab-manager/layouts/content-toolbar-sidebar-view'
import { FocalPointProvider } from '@Pimcore/components/focal-point/provider/focal-point-provider'

export interface IZoomContext {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export const ZoomContext = createContext<IZoomContext>({ zoom: 100, setZoom: () => {} })

const PreviewContainer = (): React.JSX.Element => {
  const [zoom, setZoom] = useState<number>(100)
  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetByIdQuery({ id: assetContext.id! })
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  const contextValue = useMemo<IZoomContext>(() => ({
    zoom,
    setZoom
  }), [zoom])
  const imageData = data as Image
  return (
    <FocalPointProvider>
      <ZoomContext.Provider value={ contextValue }>
        <ContentToolbarSidebarView renderSidebar={
          <Sidebar
            buttons={ sidebarButtons }
            entries={ sidebarEntries }
          />
          }
        >
          <PreviewView
            src={ imageData.imageThumbnailPath! }
          />
        </ContentToolbarSidebarView>
      </ZoomContext.Provider>
    </FocalPointProvider>
  )
}

export { PreviewContainer }
