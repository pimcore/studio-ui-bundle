/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import type { MediaQuery } from '../../types/media-query.types'
import { MediaQueryTabContent } from './media-query-tab-content'
import { DEFAULT_MEDIA_QUERY_ID } from '../../utils/media-query-helpers'

interface MediaQueryTabsProps {
  mediaQueries: MediaQuery[]
  activeKey?: string
  onTabChange: (activeKey: string) => void
  onTabClose: (targetKey: string) => void
  onMediaQueryUpdate: (mediaQueryId: string, updatedMediaQuery: MediaQuery) => void
}

export const MediaQueryTabs = ({
  mediaQueries,
  activeKey,
  onTabChange,
  onTabClose,
  onMediaQueryUpdate
}: MediaQueryTabsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const handleMediaQueryUpdate = useCallback((mediaQuery: MediaQuery) => {
    onMediaQueryUpdate(mediaQuery.id, mediaQuery)
  }, [onMediaQueryUpdate])

  const handleEdit = useCallback((targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      onTabClose(targetKey)
    }
  }, [onTabClose])

  const tabItems = useMemo(() => mediaQueries.map((mediaQuery) => ({
    key: mediaQuery.id,
    label: mediaQuery.id === DEFAULT_MEDIA_QUERY_ID
      ? t('image-thumbnails.editor.media-queries.default')
      : mediaQuery.displayName,
    closable: mediaQuery.id !== DEFAULT_MEDIA_QUERY_ID,
    children: (
      <MediaQueryTabContent
        mediaQuery={ mediaQuery }
        onMediaQueryUpdate={ handleMediaQueryUpdate }
      />
    )
  })), [mediaQueries, handleMediaQueryUpdate])

  return (
    <Tabs
      activeKey={ activeKey }
      hideAdd
      items={ tabItems }
      onChange={ onTabChange }
      onEdit={ handleEdit }
      size="small"
      type="editable-card"
    />
  )
}
