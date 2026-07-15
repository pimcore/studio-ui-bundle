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
import {
  useAssetGetFolderPreviewSettingQuery,
  useAssetUpdateFolderPreviewSettingMutation
} from './folder-preview-setting-api-slice'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from './pagination/pagination'
import { Flex } from '@Pimcore/components/flex/flex'
import { PreviewCardContainer } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container'
import { IconButton, Split } from '@sdk/components'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { SizeTypes } from '@Pimcore/components/preview-card/preview-card'
import { Text } from '@Pimcore/components/text/text'

const PreviewContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const assetContext = useContext(AssetContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [cardSize, setCardSize] = useState<SizeTypes>(SizeTypes.SMALL)
  const assetId = assetContext.id
  const { asset } = useAssetDraft(assetId)

  const { data: previewSetting } = useAssetGetFolderPreviewSettingQuery({ folderId: assetId })
  const [updateFolderPreviewSetting] = useAssetUpdateFolderPreviewSettingMutation()

  useEffect(() => {
    if (previewSetting?.imageSize !== undefined) {
      setCardSize(previewSetting.imageSize as SizeTypes)
    }
  }, [previewSetting?.imageSize])

  const { data, isFetching, refetch } = useAssetGetTreeQuery({
    pathIncludeDescendants: true,
    page: currentPage,
    pageSize,
    excludeFolders: true,
    path: asset?.fullPath
  }, { refetchOnMountOrArgChange: true })

  const total = data?.totalItems ?? 0

  function onPagerChange (page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return useMemo(() => (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <Flex
            align='center'
            gap='extra-small'
            style={ { paddingBottom: 4 } }
          >
            <Text type='secondary'>{ t('asset.folder.preview.image-display') }</Text>
            <Segmented
              onChange={ (value) => {
                const size = value as SizeTypes
                setCardSize(size)
                void updateFolderPreviewSetting({ folderId: assetId, body: { imageSize: size } })
              } }
              options={ [
                { label: t('asset.folder.preview.image-display.small'), value: SizeTypes.SMALL },
                { label: t('asset.folder.preview.image-display.large'), value: SizeTypes.LARGE }
              ] }
              value={ cardSize }
            />
          </Flex>
          <Split size='extra-small'>
            <IconButton
              icon={ { value: 'refresh' } }
              loading={ isFetching }
              onClick={ async () => await refetch() }
            />
            <Pagination
              current={ currentPage }
              defaultPageSize={ pageSize }
              onChange={ onPagerChange }
              total={ total }
            />
          </Split>
        </Toolbar>
      }
    >
      <Content
        loading={ isFetching }
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
                size={ cardSize }
              />
            ))}
          </Flex>
        )}
      </Content>
    </ContentLayout >
  ), [currentPage, pageSize, data, isFetching, cardSize])
}

export { PreviewContainer }
