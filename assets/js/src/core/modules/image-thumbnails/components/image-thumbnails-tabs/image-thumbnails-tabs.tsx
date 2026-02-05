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
import { ImageThumbnailsEditor } from '../image-thumbnails-editor/image-thumbnails-editor'
import { type ThumbnailTab } from '../../hooks/use-thumbnail-tab-manager'
import { useStyles } from './image-thumbnails-tabs.styles'

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
      icon: <Icon value="image-thumbnail-clear" />,
      children: (
        <ImageThumbnailsEditor
          selectedThumbnail={tab.thumbnail}
          isActive={activeTabKey === tab.thumbnail.id}
          onChange={(isDirty) => onTabDirtyChange(tab.thumbnail.id, isDirty)}
        />
      )
    }))
  }, [openedThumbnails, activeTabKey, onTabDirtyChange])

  return (
    <Tabs
      activeKey={activeTabKey}
      className={styles.tabs}
      hasStickyHeader
      items={tabItems}
      onChange={onChangeTab}
      onClose={onCloseTab}
      rootClassName={styles.tabsContainer}
      type="editable-card"
    />
  )
}