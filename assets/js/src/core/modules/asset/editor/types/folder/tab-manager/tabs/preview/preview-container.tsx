/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAssetGetTreeQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import React, { useContext, useMemo, useState } from 'react'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from './pagination/pagination'
import { Flex } from '@Pimcore/components/flex/flex'
import { PreviewCardContainer } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container'

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

  return useMemo(() => (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify={ 'flex-end' }
          theme='secondary'
        >
          <Pagination
            current={ currentPage }
            defaultPageSize={ pageSize }
            onChange={ onPagerChange }
            total={ total }
          />
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        padded
      >
        {data?.items !== undefined && data.items.length > 0 && (
          <Flex
            gap={ 'extra-small' }
            wrap
          >
            {data.items.map((asset, index) => (
              <PreviewCardContainer
                asset={ asset }
                key={ `${asset.id}-${index}` }
              />
            ))}
          </Flex>
        )}
      </Content>
    </ContentLayout >
  ), [currentPage, pageSize, data, isLoading])
}

export { PreviewContainer }
