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
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Icon } from '@Pimcore/components/icon/icon'
import { VideoThumbnailsEditor } from '../video-thumbnails-editor/video-thumbnails-editor'
import { type ThumbnailTab } from '../../hooks/use-video-thumbnail-tab-manager'
import { useStyles } from './video-thumbnails-tabs.styles'

interface VideoThumbnailsTabsProps {
  openedThumbnails: ThumbnailTab[]
  activeTabKey: string | undefined
  onChangeTab: (key: string) => void
  onCloseTab: (key: string) => void
  onTabDirtyChange: (key: string, isDirty: boolean) => void
}

export const VideoThumbnailsTabs = ({
  openedThumbnails,
  activeTabKey,
  onChangeTab,
  onCloseTab,
  onTabDirtyChange
}: VideoThumbnailsTabsProps): React.JSX.Element => {
  const { styles } = useStyles()

  const tabItems = useMemo(() => {
    return openedThumbnails.map((tab) => ({
      key: tab.thumbnail.id,
      label: `${tab.thumbnail.name}${tab.isDirty ? ' *' : ''}`,
      icon: <Icon value="video-thumbnail" />,
      children: (
        <VideoThumbnailsEditor
          isActive={ activeTabKey === tab.thumbnail.id }
          onChange={ (isDirty) => { onTabDirtyChange(tab.thumbnail.id, isDirty) } }
          selectedThumbnail={ tab.thumbnail }
        />
      )
    }))
  }, [openedThumbnails, activeTabKey, onTabDirtyChange])

  return (
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
  )
}
