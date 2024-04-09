import React, { useContext } from 'react'
import { PreviewView } from './preview-view'
import { useApiAssetsIdGetQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { sidebarManager } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar'
import { AssetContext } from '@Pimcore/modules/asset/asset-context'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useApiAssetsIdGetQuery({ id: assetContext.id!.toString() })
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  return (
    <>
      <PreviewView src={ data!.fullPath! } />
      <Sidebar
        buttons={ sidebarButtons }
        entries={ sidebarEntries }
      />
    </>
  )
}

export { PreviewContainer }
