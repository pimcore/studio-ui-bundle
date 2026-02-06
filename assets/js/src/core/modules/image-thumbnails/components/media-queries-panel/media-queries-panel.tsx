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
import { MediaQueryModal } from '../media-query-modal/media-query-modal'
import { MediaQueryTabs } from '../media-query-tabs/media-query-tabs'
import type { MediaQuery } from '../../types/media-query.types'
import { generateMediaQueryId, generateTransformationId } from '../../utils/media-query-helpers'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface MediaQueriesPanelProps {
  mediaQueries: MediaQuery[]
  onChange: (mediaQueries: MediaQuery[]) => void
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export const MediaQueriesPanel = ({ 
  mediaQueries, 
  onChange, 
  collapsed = true, 
  onCollapsedChange 
}: MediaQueriesPanelProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(
    mediaQueries.length > 0 ? mediaQueries[0].id : undefined
  )

  const handleAddMediaQuery = useCallback((query: string) => {
    const newMediaQuery: MediaQuery = {
      id: generateMediaQueryId(),
      query: query.trim(),
      displayName: getDisplayName(query.trim()),
      transformations: [],
      order: mediaQueries.length
    }

    const updatedMediaQueries = [...mediaQueries, newMediaQuery]
    onChange(updatedMediaQueries)
    setActiveTabKey(newMediaQuery.id)
    setModalOpen(false)
    
    if (collapsed && onCollapsedChange) {
      onCollapsedChange(false)
    }
  }, [mediaQueries, onChange, collapsed, onCollapsedChange])

  const handleRemoveMediaQuery = useCallback((id: string) => {
    const updatedMediaQueries = mediaQueries.filter(mq => mq.id !== id)
    onChange(updatedMediaQueries)
    
    if (activeTabKey === id) {
      setActiveTabKey(updatedMediaQueries.length > 0 ? updatedMediaQueries[0].id : undefined)
    }
  }, [mediaQueries, onChange, activeTabKey])

  const handleTransformationAdd = useCallback((mediaQueryId: string, type: TransformationDynamicTypeInterface, config: any) => {
    const updatedMediaQueries = mediaQueries.map(mq => {
      if (mq.id !== mediaQueryId) return mq

      const newTransformation = {
        id: generateTransformationId(),
        type: type.getName() as any,
        subtype: undefined, 
        config: config,
        label: generateTransformationLabel(type, config)
      }

      return {
        ...mq,
        transformations: [...mq.transformations, newTransformation]
      }
    })

    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const handleTransformationRemove = useCallback((mediaQueryId: string, transformationId: string) => {
    const updatedMediaQueries = mediaQueries.map(mq => {
      if (mq.id !== mediaQueryId) return mq

      return {
        ...mq,
        transformations: mq.transformations.filter(t => t.id !== transformationId)
      }
    })

    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const handleTransformationUpdate = useCallback((mediaQueryId: string, transformationId: string, config: any) => {
    const updatedMediaQueries = mediaQueries.map(mq => {
      if (mq.id !== mediaQueryId) return mq

      return {
        ...mq,
        transformations: mq.transformations.map(t => 
          t.id === transformationId ? { ...t, config } : t
        )
      }
    })

    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const handleTransformationMoveUp = useCallback((mediaQueryId: string, transformationId: string) => {
    const updatedMediaQueries = mediaQueries.map(mq => {
      if (mq.id !== mediaQueryId) return mq

      const currentIndex = mq.transformations.findIndex(t => t.id === transformationId)
      if (currentIndex <= 0) return mq // Can't move up if it's the first item

      const newTransformations = [...mq.transformations]
      const temp = newTransformations[currentIndex]
      newTransformations[currentIndex] = newTransformations[currentIndex - 1]
      newTransformations[currentIndex - 1] = temp

      return {
        ...mq,
        transformations: newTransformations
      }
    })

    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const handleTransformationMoveDown = useCallback((mediaQueryId: string, transformationId: string) => {
    const updatedMediaQueries = mediaQueries.map(mq => {
      if (mq.id !== mediaQueryId) return mq

      const currentIndex = mq.transformations.findIndex(t => t.id === transformationId)
      if (currentIndex >= mq.transformations.length - 1) return mq //
      const newTransformations = [...mq.transformations]
      const temp = newTransformations[currentIndex]
      newTransformations[currentIndex] = newTransformations[currentIndex + 1]
      newTransformations[currentIndex + 1] = temp

      return {
        ...mq,
        transformations: newTransformations
      }
    })

    onChange(updatedMediaQueries)
  }, [mediaQueries, onChange])

  const newButton = (
    <Button
      type="link"
      icon={<Icon value="plus-circle" options={{ width: 16, height: 16 }} />}
      size="small"
      onClick={() => setModalOpen(true)}
    >
      {t('image-thumbnails.editor.media-queries.new')}
    </Button>
  )

  return (
    <>
      <Panel
        title={t('image-thumbnails.editor.media-queries')}
        collapsible={true}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        border={true}
        theme="card-with-highlight"
        contentPadding="small"
        extra={newButton}
        extraPosition="end"
      >
        <MediaQueryTabs
          mediaQueries={mediaQueries}
          activeKey={activeTabKey}
          onTabChange={setActiveTabKey}
          onTabClose={handleRemoveMediaQuery}
          onTransformationAdd={handleTransformationAdd}
          onTransformationRemove={handleTransformationRemove}
          onTransformationUpdate={handleTransformationUpdate}
          onTransformationMoveUp={handleTransformationMoveUp}
          onTransformationMoveDown={handleTransformationMoveDown}
        />
      </Panel>

      <MediaQueryModal
        open={modalOpen}
        onOk={handleAddMediaQuery}
        onCancel={() => setModalOpen(false)}
      />
    </>
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

function generateTransformationLabel(type: TransformationDynamicTypeInterface, config: any): string {
  const typeName = type.getName()
  
  switch (typeName) {
    case 'cover':
      const { width, height } = config
      return `Cover ${width || '?'}x${height || '?'}`
    case 'resize':
      const { width: rWidth, height: rHeight } = config
      return `Resize ${rWidth || '?'}x${rHeight || '?'}`
    case 'scaleByWidth':
      return `Scale by Width ${config.width || '?'}px`
    case 'scale-by-height':
      return `Scale by Height ${config.height || '?'}px`
    case 'trim':
      return `Trim ${config.trim || 'Both'}`
    case 'effects':
      return `${config.effect || 'Effect'} Effect`
    default:
      return type.getLabel()
  }
}