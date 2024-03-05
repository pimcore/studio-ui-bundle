import { useApiAssetsGetCollectionQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-container'
import React, { useContext, useState } from 'react'
import { GridContainer } from './list/grid-container'
import { GridToolbarContainer } from './list/grid-toolbar-container'
import { ContentToolbarSidebarView } from '@Pimcore/modules/element-editor/tab-layouts/content-toolbar-sidebar-view'

const ListContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const assetId = assetContext.id
  const { isLoading, isError, data } = useApiAssetsGetCollectionQuery({ parentId: assetId, page: currentPage, itemsPerPage: pageSize })

  if (isLoading || data === undefined) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  const total = data['hydra:totalItems']!

  function onPagerChange (page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentToolbarSidebarView
      renderToolbar={
        <GridToolbarContainer
          pager={{
            current: currentPage,
            total,
            pageSize,
            onChange: onPagerChange
          }}
        />
      }
    >
      <GridContainer assets={data['hydra:member']} />
    </ContentToolbarSidebarView>
  )
}

export { ListContainer }
