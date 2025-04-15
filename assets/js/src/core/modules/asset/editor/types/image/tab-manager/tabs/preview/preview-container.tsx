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
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { FocalPointProvider } from '@Pimcore/components/focal-point/provider/focal-point-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface IZoomContext {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

export const ZoomContext = createContext<IZoomContext>({ zoom: 100, setZoom: () => {} })

const PreviewContainer = (): React.JSX.Element => {
  const [zoom, setZoom] = useState<number>(100)
  const { id } = useContext(AssetContext)
  const { isLoading } = useAssetDraft(id)
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  const contextValue = useMemo<IZoomContext>(() => ({
    zoom,
    setZoom
  }), [zoom])
  const previewImgUrl = `${getPrefix()}/assets/${id}/image/stream/preview`

  if (isLoading) {
    return <Content loading />
  }

  return (
    <FocalPointProvider>
      <ZoomContext.Provider value={ contextValue }>
        <ContentLayout renderSidebar={
          <Sidebar
            buttons={ sidebarButtons }
            entries={ sidebarEntries }
          />
          }
        >
          <PreviewView src={ previewImgUrl } />
        </ContentLayout>
      </ZoomContext.Provider>
    </FocalPointProvider>
  )
}

export { PreviewContainer }
