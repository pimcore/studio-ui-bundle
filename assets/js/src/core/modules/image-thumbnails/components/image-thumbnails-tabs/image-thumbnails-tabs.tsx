/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useMemo } from 'react'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Icon } from '@Pimcore/components/icon/icon'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { PortalSlot } from '@Pimcore/components/portal/portal-slot'
import { ImageThumbnailsEditor } from '../image-thumbnails-editor/image-thumbnails-editor'
import { type ThumbnailTab } from '../../hooks/use-thumbnail-tab-manager'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useStyles } from './image-thumbnails-tabs.styles'

const SAVE_BUTTON_PORTAL_ID = 'image-thumbnails-save-button'

interface ImageThumbnailsTabEditorProps {
  thumbnail: ThumbnailConfigurationData
  activeTabKey: string | undefined
  onTabDirtyChange: (key: string, isDirty: boolean) => void
}

const ImageThumbnailsTabEditor = memo(({
  thumbnail,
  activeTabKey,
  onTabDirtyChange
}: ImageThumbnailsTabEditorProps): React.JSX.Element => {
  const isActive = activeTabKey === thumbnail.id

  const onChange = useCallback((isDirty: boolean): void => {
    onTabDirtyChange(thumbnail.id, isDirty)
  }, [thumbnail.id, onTabDirtyChange])

  return (
    <ImageThumbnailsEditor
      isActive={ isActive }
      onChange={ onChange }
      selectedThumbnail={ thumbnail }
    />
  )
})

ImageThumbnailsTabEditor.displayName = 'ImageThumbnailsTabEditor'

interface ImageThumbnailsTabsProps {
  openedThumbnails: ThumbnailTab[]
  activeTabKey: string | undefined
  onChangeTab: (key: string) => void
  onCloseTab: (key: string) => void
  onTabDirtyChange: (key: string, isDirty: boolean) => void
}

export const ImageThumbnailsTabs = ({
  openedThumbnails,
  activeTabKey,
  onChangeTab,
  onCloseTab,
  onTabDirtyChange
}: ImageThumbnailsTabsProps): React.JSX.Element => {
  const { styles } = useStyles()

  const tabItems = useMemo(() => {
    return openedThumbnails.map((tab) => ({
      key: tab.thumbnail.id,
      label: `${tab.thumbnail.name}${tab.isDirty ? ' *' : ''}`,
      icon: <Icon value="image-thumbnail" />,
      children: (
        <ImageThumbnailsTabEditor
          activeTabKey={ activeTabKey }
          onTabDirtyChange={ onTabDirtyChange }
          thumbnail={ tab.thumbnail }
        />
      )
    }))
  }, [openedThumbnails, activeTabKey, onTabDirtyChange])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify='flex-end'>
          <PortalSlot id={ SAVE_BUTTON_PORTAL_ID } />
        </Toolbar>
      }
    >
      <Tabs
        activeKey={ activeTabKey }
        className={ styles.tabs }
        hasStickyHeader
        items={ tabItems }
        onChange={ onChangeTab }
        onClose={ onCloseTab }
        rootClassName={ styles.tabsContainer }
        type="editable-card"
      />
    </ContentLayout>
  )
}
