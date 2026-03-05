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
import { generateMediaQueryId, getDisplayName, DEFAULT_MEDIA_QUERY_ID } from '../../utils/media-query-helpers'
import type { MediaQuery } from '../../types/media-query.types'

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
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(DEFAULT_MEDIA_QUERY_ID)

  const handleAddMediaQuery = useCallback(() => {
    modal.input({
      title: t('image-thumbnails.editor.media-queries.add.title'),
      label: t('image-thumbnails.editor.media-queries.add.label'),
      okText: 'Create',
      cancelButtonProps: { style: { display: 'none' } },
      maskClosable: true,
      rule: {
        required: true
      },
      onOk: async (query: string) => {
        const sanitised = query.trim().replaceAll(/[^a-zA-Z0-9_\-+]/g, '')
        if (sanitised === '') return

        const newMediaQuery: MediaQuery = {
          id: generateMediaQueryId(),
          query: sanitised,
          displayName: getDisplayName(sanitised),
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
    if (mediaQueryId === DEFAULT_MEDIA_QUERY_ID) {
      return
    }

    const updatedMediaQueries = mediaQueries.filter(mq => mq.id !== mediaQueryId)
    onChange(updatedMediaQueries)

    if (activeTabKey === mediaQueryId) {
      const newActiveKey = updatedMediaQueries.length > 0 ? updatedMediaQueries[0].id : DEFAULT_MEDIA_QUERY_ID
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
      {t('image-thumbnails.editor.media-queries.new')}
    </Button>
  )

  return (
    <Panel
      border
      contentPadding="small"
      extra={ newButton }
      extraPosition="end"
      theme="card-with-highlight"
      title={ t('image-thumbnails.editor.media-queries') }
    >
      <MediaQueryTabs
        activeKey={ activeTabKey }
        mediaQueries={ mediaQueries }
        onMediaQueryUpdate={ handleMediaQueryUpdate }
        onTabChange={ setActiveTabKey }
        onTabClose={ handleRemoveMediaQuery }
      />
    </Panel>
  )
}
