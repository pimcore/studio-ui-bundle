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
import { ImageThumbnailsTree } from './components/image-thumbnails-tree/image-thumbnails-tree'
import { ImageThumbnailsTabs } from './components/image-thumbnails-tabs/image-thumbnails-tabs'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { ImageThumbnailsProvider } from './providers/image-thumbnails-provider'
import { useThumbnailTabManager } from './hooks/use-thumbnail-tab-manager'
import { useTranslation } from 'react-i18next'
import { useStyles } from './image-thumbnails-container.styles'

export const ImageThumbnailsContainer = (): React.JSX.Element => {
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
    <ImageThumbnailsProvider>
      <ConfigLayout
        leftItem={ {
          size: 25,
          minSize: 200,
          children: (
            <ImageThumbnailsTree
              activeTabKey={ activeTabKey }
              modifiedThumbnails={ modifiedThumbnails }
              onThumbnailClose={ handleCloseTab }
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
                  {t('image-thumbnails.editor.select-thumbnail')}
                </div>
              </Content>
              )
            : (
              <ImageThumbnailsTabs
                activeTabKey={ activeTabKey }
                onChangeTab={ handleChangeTab }
                onCloseTab={ handleCloseTab }
                onTabDirtyChange={ handleTabDirtyChange }
                openedThumbnails={ openedThumbnails }
              />
              )
        } }
      />
    </ImageThumbnailsProvider>
  )
}
