/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { VideoThumbnailsTree } from './components/video-thumbnails-tree/video-thumbnails-tree'
import { VideoThumbnailsTabs } from './components/video-thumbnails-tabs/video-thumbnails-tabs'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { VideoThumbnailsProvider } from './providers/video-thumbnails-provider'
import { useThumbnailTabManager } from './hooks/use-video-thumbnail-tab-manager'
import { useTranslation } from 'react-i18next'
import { useStyles } from './video-thumbnails-container.styles'

export const VideoThumbnailsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const {
    openedThumbnails,
    activeTabKey,
    handleOpenThumbnail,
    handleCloseTab,
    handleChangeTab,
    handleTabDirtyChange,
    getModifiedThumbnailIds
  } = useThumbnailTabManager()

  const modifiedThumbnails = useMemo(() => getModifiedThumbnailIds(), [getModifiedThumbnailIds])

  const handleThumbnailSelect = (thumbnail: ThumbnailConfigurationData): void => {
    handleOpenThumbnail(thumbnail)
  }

  return (
    <VideoThumbnailsProvider>
      <ConfigLayout
        leftItem={ {
          size: 25,
          minSize: 200,
          children: (
            <VideoThumbnailsTree
              activeTabKey={ activeTabKey }
              modifiedThumbnails={ modifiedThumbnails }
              onThumbnailSelect={ handleThumbnailSelect }
              openedThumbnails={ openedThumbnails }
            />
          )
        } }
        rightItem={ {
          size: 75,
          children: openedThumbnails.length === 0
            ? (
              <Content padded>
                <div className={ styles.emptyState }>
                  {t('video-thumbnails.editor.select-thumbnail')}
                </div>
              </Content>
              )
            : (
              <VideoThumbnailsTabs
                activeTabKey={ activeTabKey }
                onChangeTab={ handleChangeTab }
                onCloseTab={ handleCloseTab }
                onTabDirtyChange={ handleTabDirtyChange }
                openedThumbnails={ openedThumbnails }
              />
              )
        } }
      />
    </VideoThumbnailsProvider>
  )
}
