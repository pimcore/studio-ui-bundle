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
import { Flex } from '@Pimcore/components/flex/flex'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { ImageThumbnailsTree } from './components/image-thumbnails-tree/image-thumbnails-tree'
import { ImageThumbnailsTabs } from './components/image-thumbnails-tabs/image-thumbnails-tabs'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { useStyles } from './image-thumbnails-container.styles'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { ImageThumbnailsProvider } from './providers/image-thumbnails-provider'
import { PortalSlot } from '@Pimcore/components/portal/portal-slot'
import { useThumbnailTabManager } from './hooks/use-thumbnail-tab-manager'
import { useTranslation } from 'react-i18next'

const SAVE_BUTTON_PORTAL_ID = 'image-thumbnails-save-button'

export const ImageThumbnailsContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

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
      <ContentLayout
        renderToolbar={
          <Toolbar justify='flex-end'>
            <PortalSlot id={ SAVE_BUTTON_PORTAL_ID } />
          </Toolbar>
        }
      >
        <Flex className={ styles.container }>
          <SplitLayout
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
                    <div style={ { textAlign: 'center', color: '#999', marginTop: '50px' } }>
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
            withDivider
          />
        </Flex>
      </ContentLayout>
    </ImageThumbnailsProvider>
  )
}
