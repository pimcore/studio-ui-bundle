/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Panel } from '@Pimcore/components/panel/panel'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { MediaQueryTabs } from '../media-query-tabs/media-query-tabs'
import { generateMediaQueryId } from '../../utils/media-query-helpers'

interface MediaQueriesPanelProps {
  mediaQueries: MediaQuery[]
  onChange: (mediaQueries: MediaQuery[]) => void
}

export const MediaQueriesPanel = ({ 
  mediaQueries, 
  onChange
}: MediaQueriesPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(
    mediaQueries.length > 0 ? mediaQueries[0].id : undefined
  )

  const handleAddMediaQuery = useCallback(() => {
    modal.input({
      title: t('image-thumbnails.editor.media-queries.add.title'),
      label: t('image-thumbnails.editor.media-queries.add.label'),
      okText: 'Create',
      cancelButtonProps: { style: { display: 'none' } }, 
      maskClosable: true,
      rule: {
        required: true,
      },
      onOk: async (query: string) => {
        const newMediaQuery: MediaQuery = {
          id: generateMediaQueryId(),
          query: query.trim(),
          displayName: getDisplayName(query.trim()),
          transformations: []
        }

        const updatedMediaQueries = [...mediaQueries, newMediaQuery]
        onChange(updatedMediaQueries)
        setActiveTabKey(newMediaQuery.id)
      }
    })
  }, [mediaQueries, onChange, modal, t])

  // Simplified media query update handler
  const handleMediaQueryUpdate = useCallback((mediaQueryId: string, updatedMediaQuery: MediaQuery) => {
    const updatedMediaQueries = mediaQueries.map(mq => 
      mq.id === mediaQueryId ? updatedMediaQuery : mq
    )
    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const handleRemoveMediaQuery = useCallback((mediaQueryId: string) => {
    const updatedMediaQueries = mediaQueries.filter(mq => mq.id !== mediaQueryId)
    onChange(updatedMediaQueries)

    if (activeTabKey === mediaQueryId) {
      const newActiveKey = updatedMediaQueries.length > 0 ? updatedMediaQueries[0].id : undefined
      setActiveTabKey(newActiveKey)
    }
  }, [mediaQueries, onChange, activeTabKey])

  const newButton = (
    <Button
      type="link"
      icon={<Icon value="plus-circle" options={{ width: 16, height: 16 }} />}
      size="small"
      onClick={handleAddMediaQuery}
    >
      {t('image-thumbnails.editor.media-queries.new')}
    </Button>
  )

  return (
    <Panel
      title={t('image-thumbnails.editor.media-queries')}
      border={true}
      theme="card-with-highlight"
      contentPadding="small"
      collapsible={true}
      collapsed={false}
      extra={newButton}
      extraPosition="end"
    >
      <MediaQueryTabs
        mediaQueries={mediaQueries}
        activeKey={activeTabKey}
        onTabChange={setActiveTabKey}
        onTabClose={handleRemoveMediaQuery}
        onMediaQueryUpdate={handleMediaQueryUpdate}
      />
    </Panel>
  )
}

// Helper functions
function getDisplayName(query: string): string {
  if (query.includes('min-width')) {
    const match = query.match(/min-width:\s*(\d+)/)
    return match ? `≥ ${match[1]}px` : query
  }
  
  if (query.includes('max-width')) {
    const match = query.match(/max-width:\s*(\d+)/)
    return match ? `≤ ${match[1]}px` : query
  }
  
  return query.length > 20 ? query.substring(0, 20) + '...' : query
}
