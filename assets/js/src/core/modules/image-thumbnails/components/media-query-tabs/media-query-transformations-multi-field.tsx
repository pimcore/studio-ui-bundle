/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { MultiFieldCollection } from '@Pimcore/components/form/controls/multi-field-collection'
import { transformationDynamicTypeRegistry, initializeTransformationTypes } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { MediaQuery, Transformation } from '../../types/media-query.types'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface MediaQueryTransformationsMultiFieldProps {
  mediaQuery: MediaQuery
  onTransformationAdd: (type: TransformationDynamicTypeInterface, config: any) => void
  onTransformationRemove: (transformationId: string) => void
  onTransformationUpdate: (transformationId: string, config: any) => void
  onTransformationMoveUp?: (transformationId: string) => void
  onTransformationMoveDown?: (transformationId: string) => void
}

interface TransformationFormData {
  transformations: Array<{
    type: string
    [key: string]: any
  }>
}

export const MediaQueryTransformationsMultiField = ({
  mediaQuery,
  onTransformationAdd,
  onTransformationRemove,
  onTransformationUpdate,
  onTransformationMoveUp,
  onTransformationMoveDown
}: MediaQueryTransformationsMultiFieldProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<TransformationFormData>()

  // Initialize transformation types
  useEffect(() => {
    initializeTransformationTypes()
  }, [])

  // Convert transformations to form data format
  const transformationsData = mediaQuery.transformations.map(transformation => ({
    type: transformation.type,
    ...transformation.config
  }))

  const initialValues: TransformationFormData = {
    transformations: transformationsData
  }

  // Sync external changes to form
  useEffect(() => {
    const newTransformationsData = mediaQuery.transformations.map(transformation => ({
      type: transformation.type,
      ...transformation.config
    }))
    
    form.setFieldValue('transformations', newTransformationsData)
  }, [mediaQuery.transformations, form])

  // Handle form changes and sync back to parent
  const handleValuesChange = (changedValues: Partial<TransformationFormData>, allValues: TransformationFormData): void => {
    if (changedValues.transformations != null) {
      const newTransformations = changedValues.transformations
      const oldTransformations = mediaQuery.transformations

      // Handle additions
      if (newTransformations.length > oldTransformations.length) {
        const newItem = newTransformations[newTransformations.length - 1]
        const { type, ...config } = newItem
        const transformationType = transformationDynamicTypeRegistry.getDynamicType(type, false)
        if (transformationType != null) {
          onTransformationAdd(transformationType, config)
        }
        return
      }

      // Handle removals
      if (newTransformations.length < oldTransformations.length) {
        // Find which transformation was removed by comparing array positions
        for (let i = 0; i < oldTransformations.length; i++) {
          if (i >= newTransformations.length || 
              newTransformations[i] == null ||
              newTransformations[i].type !== oldTransformations[i].type) {
            onTransformationRemove(oldTransformations[i].id)
            break
          }
        }
        return
      }

      // Handle updates (same length, different content)
      newTransformations.forEach((newItem, index) => {
        const oldTransformation = oldTransformations[index]
        if (oldTransformation != null && newItem != null) {
          const { type, ...config } = newItem
          // Deep comparison of config
          if (JSON.stringify(config) !== JSON.stringify(oldTransformation.config)) {
            onTransformationUpdate(oldTransformation.id, config)
          }
        }
      })
    }
  }

  return (
    <div style={{ padding: '16px', width: '100%', minHeight: '200px' }}>
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="transformations"
          style={{ marginBottom: 0 }}
        >
          <MultiFieldCollection
            registry={transformationDynamicTypeRegistry}
            title={t('image-thumbnails.editor.transformations')}
            collapsed={false}
          />
        </Form.Item>
      </Form>
    </div>
  )
}