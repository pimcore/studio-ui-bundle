import React, { createContext, useContext, useMemo, useState } from 'react'
import { PreviewView } from './preview-view'
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar'
import { AssetContext } from '@Pimcore/modules/asset/asset-context'
import { useStyle } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container.styles'

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
  const { styles } = useStyle()

  const contextValue = useMemo<IZoomContext>(() => ({
    zoom,
    setZoom
  }), [zoom])

  return (
    <ZoomContext.Provider value={ contextValue }>
      <div className={ styles.relativeContainer }>
        <PreviewView
          src={ data!.fullPath! }
        />
      </div>

      <Sidebar
        buttons={ sidebarButtons }
        entries={ sidebarEntries }
      />
    </ZoomContext.Provider>
  )
}

export { PreviewContainer }
