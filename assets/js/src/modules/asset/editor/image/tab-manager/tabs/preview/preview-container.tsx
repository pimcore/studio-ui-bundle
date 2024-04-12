import React, { createContext, useContext, useState } from 'react'
import { PreviewView } from './preview-view'
import { useApiAssetsIdGetQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar'
import { AssetContext } from '@Pimcore/modules/asset/asset-context'
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import { useStyle } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container.styles'

export const ZoomContext = createContext<number>(100)

const PreviewContainer = (): React.JSX.Element => {
  const [zoom, setZoom] = useState<number>(100)
  const assetContext = useContext(AssetContext)
  const { data } = useApiAssetsIdGetQuery({ id: assetContext.id!.toString() })
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()
  const { styles } = useStyle()

  return (
    <ZoomContext.Provider value={ zoom }>
      <div className={ styles.relativeContainer }>
        <PreviewView
          src={ data!.fullPath! }
        />

        <div className={ styles.floatingContainer }>
          <div className={ styles.flexContainer }>
            <ImageZoom
              setZoom={ setZoom }
              zoom={ zoom }
            />
          </div>
        </div>
      </div>

      <Sidebar
        buttons={ sidebarButtons }
        entries={ sidebarEntries }
      />
    </ZoomContext.Provider>
  )
}

export { PreviewContainer }
