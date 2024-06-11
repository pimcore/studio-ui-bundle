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

import React, { useContext, useState } from 'react'
import {
  useCleanupVersionMutation,
  useDeleteVersionMutation,
  useGetVersionsQuery, usePublishVersionMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen'
import { VersionsView } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { Pagination } from '@Pimcore/components/pagination/pagination'

export const VersionsTabContainer = (): React.JSX.Element => {
  const [deleteVersion] = useDeleteVersionMutation()
  const [publishVersion] = usePublishVersionMutation()
  const [cleanupVersion] = useCleanupVersionMutation()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const assetContext = useContext(AssetContext)
  const { isLoading, data } = useGetVersionsQuery({
    id: assetContext.id!,
    elementType: 'asset',
    page: currentPage,
    pageSize
  })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  function onPagerChange (page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <div>
      <VersionsView
        onClickClearAll={ async (
          elementType,
          id
        ): Promise<void> => {
          await cleanupVersion({
            elementType,
            id
          })
        }
        }
        onClickDelete={
          async (id: number): Promise<void> => {
            await deleteVersion({
              id
            })
          }
        }
        onClickPublish={
          async (id: number): Promise<void> => {
            await publishVersion({
              id
            })
          }
        }
        versions={ data!.items }
      />
      <Pagination
        current={ currentPage }
        defaultPageSize={ pageSize }
        onChange={ onPagerChange }
        pageSizeOptions={ ['10', '20', '50', '100'] }
        showSizeChanger
        total={ data!.totalItems }
      />
    </div>
  )
}
