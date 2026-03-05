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
import { VideoMediaQueryTabs } from '../media-query-tabs/media-query-tabs'
import { generateMediaQueryId } from '../../utils/media-query-helpers'
import type { MediaQuery } from '../../types/media-query.types'

interface VideoMediaQueriesPanelProps {
  mediaQueries: MediaQuery[]
  onChange: (mediaQueries: MediaQuery[]) => void
}

export const VideoMediaQueriesPanel = ({
  mediaQueries,
  onChange
}: VideoMediaQueriesPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(
    mediaQueries.length > 0 ? mediaQueries[0].id : undefined
  )

  const handleAddMediaQuery = useCallback(() => {
    modal.input({
      title: t('video-thumbnails.editor.media-segments.add.title'),
      label: t('video-thumbnails.editor.media-segments.add.label'),
      okText: t('video-thumbnails.editor.media-segments.add.ok'),
      cancelButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      rule: {
        required: true
      },
      onOk: async (segmentName: string) => {
        const sanitised = segmentName.trim().replaceAll(/[^a-zA-Z0-9_\-+]/g, '')

        if (sanitised === '') return
        if (mediaQueries.some(mq => mq.query === sanitised)) return

        const newMediaQuery: MediaQuery = {
          id: generateMediaQueryId(),
          query: sanitised,
          displayName: sanitised,
          transformations: [],
          order: mediaQueries.length
        }

        const updatedMediaQueries = [...mediaQueries, newMediaQuery]
        onChange(updatedMediaQueries)
        setActiveTabKey(newMediaQuery.id)
      }
    })
  }, [mediaQueries, onChange, modal, t])

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
      icon={ <Icon
        options={ { width: 16, height: 16 } }
        value="plus-circle"
             /> }
      onClick={ handleAddMediaQuery }
      size="small"
      type="link"
    >
      {t('video-thumbnails.editor.media-segments.new')}
    </Button>
  )

  return (
    <Panel
      border
      contentPadding="small"
      extra={ newButton }
      extraPosition="end"
      theme="card-with-highlight"
      title={ t('video-thumbnails.editor.media-segments') }
    >
      <VideoMediaQueryTabs
        activeKey={ activeTabKey }
        mediaQueries={ mediaQueries }
        onMediaQueryUpdate={ handleMediaQueryUpdate }
        onTabChange={ setActiveTabKey }
        onTabClose={ handleRemoveMediaQuery }
      />
    </Panel>
  )
}
