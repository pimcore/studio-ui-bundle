import { useGetAssetsQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import React, { useContext, useState } from 'react'
import { GridToolbarContainer } from '../list/grid-toolbar-container'
import { ContentToolbarSidebarView } from '@Pimcore/modules/element/editor/tab-manager/layouts/content-toolbar-sidebar-view'
import { FlexContainer } from '@Pimcore/modules/asset/editor/folder/tab-manager/tabs/preview/flex-container'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-context'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const assetId = assetContext.id!
  const { asset } = useAssetDraft(assetId)

  const { isLoading, isError, data } = useGetAssetsQuery({
    pathIncludeDescendants: true,
    page: currentPage,
    pageSize,
    excludeFolders: true,
    path: asset?.fullPath
  })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const total = data.totalItems!

  function onPagerChange (page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentToolbarSidebarView
      renderToolbar={
        <GridToolbarContainer
          pager={ {
            current: currentPage,
            total,
            pageSize,
            onChange: onPagerChange
          } }
        />
      }
    >
      <FlexContainer assets={ data } />
    </ContentToolbarSidebarView>
  )
}

export { PreviewContainer }
