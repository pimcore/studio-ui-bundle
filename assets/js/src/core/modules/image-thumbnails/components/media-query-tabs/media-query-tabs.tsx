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
import { Form } from '@Pimcore/components/form/form'
import type { MediaQuery } from '../../types/media-query.types'
import { MediaQueryTabContent } from './media-query-tab-content'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface MediaQueryTabsProps {
  mediaQueries: MediaQuery[]
  activeKey?: string
  onTabChange: (activeKey: string) => void
  onTabClose: (targetKey: string) => void
  onTransformationAdd: (mediaQueryId: string, type: TransformationDynamicTypeInterface, config: any) => void
  onTransformationRemove: (mediaQueryId: string, transformationId: string) => void
  onTransformationUpdate: (mediaQueryId: string, transformationId: string, config: any) => void
  onTransformationMoveUp?: (mediaQueryId: string, transformationId: string) => void
  onTransformationMoveDown?: (mediaQueryId: string, transformationId: string) => void
}

export const MediaQueryTabs = ({
  mediaQueries,
  activeKey,
  onTabChange,
  onTabClose,
  onTransformationAdd,
  onTransformationRemove,
  onTransformationUpdate,
  onTransformationMoveUp,
  onTransformationMoveDown
}: MediaQueryTabsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const getInitialFormValues = useCallback(() => {
    const formValues: Record<string, any> = {}
    
    mediaQueries.forEach(mediaQuery => {
      formValues[mediaQuery.id] = {
        transformations: mediaQuery.transformations.map(transformation => ({
          id: transformation.id,
          type: transformation.type,
          config: transformation.config || {}
        }))
      }
    })
    
    return formValues
  }, [mediaQueries])

  const handleFormChange = useCallback((changedValues: any, allValues: any) => {
    Object.entries(changedValues).forEach(([mediaQueryId, mediaQueryChanges]: [string, any]) => {
      if (mediaQueryChanges?.transformations) {
        mediaQueryChanges.transformations.forEach((transformationChanges: any, transformationIndex: number) => {
          if (transformationChanges?.config) {
            const transformation = mediaQueries
              .find(mq => mq.id === mediaQueryId)?.transformations[transformationIndex]
            
            if (transformation) {
              const updatedConfig = { 
                ...transformation.config, 
                ...transformationChanges.config 
              }
              onTransformationUpdate(mediaQueryId, transformation.id, updatedConfig)
            }
          }
        })
      }
    })
  }, [mediaQueries, onTransformationUpdate])

  if (mediaQueries.length === 0) {
    return (
      <Empty 
        description={t('image-thumbnails.editor.media-queries.empty')}
        style={{ padding: '20px' }}
      />
    )
  }

  const tabItems = mediaQueries.map((mediaQuery) => ({
    key: mediaQuery.id,
    label: mediaQuery.displayName,
    closable: true,
    children: (
      <MediaQueryTabContent
        mediaQuery={mediaQuery}
        onTransformationAdd={(type, config) => onTransformationAdd(mediaQuery.id, type, config)}
        onTransformationRemove={(transformationId) => onTransformationRemove(mediaQuery.id, transformationId)}
        onTransformationUpdate={(transformationId, config) => onTransformationUpdate(mediaQuery.id, transformationId, config)}
        onTransformationMoveUp={(transformationId) => onTransformationMoveUp?.(mediaQuery.id, transformationId)}
        onTransformationMoveDown={(transformationId) => onTransformationMoveDown?.(mediaQuery.id, transformationId)}
      />
    )
  }))

  return (
    <Form
      form={form}
      onValuesChange={handleFormChange}
      initialValues={getInitialFormValues()}
    >
      <Tabs
        type="editable-card"
        items={tabItems}
        activeKey={activeKey}
        onChange={onTabChange}
        onEdit={(targetKey, action) => {
          if (action === 'remove' && typeof targetKey === 'string') {
            onTabClose(targetKey)
          }
        }}
        hideAdd
        size="small"
      />
    </Form>
  )
}