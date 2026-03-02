/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Empty } from '@Pimcore/components/empty/empty'
import type { MediaQuery } from '../../types/media-query.types'
import { VideoMediaQueryTabContent } from './media-query-tab-content'

interface VideoMediaQueryTabsProps {
  mediaQueries: MediaQuery[]
  activeKey?: string
  onTabChange: (activeKey: string) => void
  onTabClose: (targetKey: string) => void
  onMediaQueryUpdate: (mediaQueryId: string, updatedMediaQuery: MediaQuery) => void
}

export const VideoMediaQueryTabs = ({
  mediaQueries,
  activeKey,
  onTabChange,
  onTabClose,
  onMediaQueryUpdate
}: VideoMediaQueryTabsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const handleMediaQueryUpdate = useCallback((mediaQuery: MediaQuery) => {
    onMediaQueryUpdate(mediaQuery.id, mediaQuery)
  }, [onMediaQueryUpdate])

  if (mediaQueries.length === 0) {
    return (
      <Empty
        description={ t('video-thumbnails.editor.media-segments.empty') }
        style={ { padding: '20px' } }
      />
    )
  }

  const tabItems = mediaQueries.map((mediaQuery) => ({
    key: mediaQuery.id,
    label: mediaQuery.displayName,
    closable: true,
    children: (
      <VideoMediaQueryTabContent
        mediaQuery={ mediaQuery }
        onMediaQueryUpdate={ handleMediaQueryUpdate }
      />
    )
  }))

  return (
    <Tabs
      activeKey={ activeKey }
      hideAdd
      items={ tabItems }
      onChange={ onTabChange }
      onEdit={ (targetKey, action) => {
        if (action === 'remove' && typeof targetKey === 'string') {
          onTabClose(targetKey)
        }
      } }
      size="small"
      type="editable-card"
    />
  )
}
