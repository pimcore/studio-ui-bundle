import React, { useContext } from 'react'
import { PreviewView } from './preview-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import { useApiAssetsIdGetQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/types/image/sidebar'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useApiAssetsIdGetQuery({ id: assetContext.id!.toString() })
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  return (
      <>
        <PreviewView src={data!.fullPath!} />
        <Sidebar entries={sidebarEntries} buttons={sidebarButtons} />
      </>
  )
}

export { PreviewContainer }
