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

import { useAssetGetTreeQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import React, { useContext, useMemo, useState } from 'react'
import { FlexContainer } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/flex-container'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const assetId = assetContext.id
  const { asset } = useAssetDraft(assetId)

  const { data, isLoading } = useAssetGetTreeQuery({
    pathIncludeDescendants: true,
    page: currentPage,
    pageSize,
    excludeFolders: true,
    path: asset?.fullPath
  })

  const total = data?.totalItems ?? 0

  function onPagerChange (page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  console.log({ total, onPagerChange })

  return useMemo(() => (
    <ContentLayout
      renderToolbar={
        <>
          {/* @todo toolbar should not be shared with the grid...
          <GridToolbarContainer
          pager={ data !== undefined && data.totalItems > 0
            ? {
                current: currentPage,
                total,
                pageSize,
                onChange: onPagerChange
              }
            : undefined }
          /> */}
        </>
      }
    >
      <Content
        loading={ isLoading }
        padded
      >
        { data?.items !== undefined && data.items.length > 0 && (
          <FlexContainer assets={ data } />
        )}
      </Content>
    </ContentLayout>
  ), [currentPage, pageSize, data, isLoading])
}

export { PreviewContainer }
