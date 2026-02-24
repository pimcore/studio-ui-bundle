/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { FieldCollection } from '@Pimcore/components/form/controls/field-collection/field-collection'
import { TransformationFieldCollectionRegistry } from '../../registries/transformation-field-collection-registry'
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
    data: any
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

  // Create the field collection registry adapter
  const fieldCollectionRegistry = useMemo(() => {
    return new TransformationFieldCollectionRegistry(transformationDynamicTypeRegistry)
  }, [])

  // Convert transformations to field collection format
  const transformationsData = useMemo(() => 
    mediaQuery.transformations.map(transformation => ({
      type: transformation.type,
      data: transformation.config || {}
    })), [mediaQuery.transformations]
  )

  // Sync external changes to form
  useEffect(() => {
    form.setFieldValue('transformations', transformationsData)
  }, [transformationsData, form])

  // Handle form changes and sync back to parent
  const handleTransformationsChange = (newTransformations: Array<{ type: string; data: any }> | undefined): void => {
    if (!newTransformations) return

    const oldTransformations = mediaQuery.transformations

    // Handle additions
    if (newTransformations.length > oldTransformations.length) {
      const newItem = newTransformations[newTransformations.length - 1]
      const transformationType = transformationDynamicTypeRegistry.getDynamicType(newItem.type, false)
      if (transformationType != null) {
        onTransformationAdd(transformationType, newItem.data)
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
        // Deep comparison of config
        if (JSON.stringify(newItem.data) !== JSON.stringify(oldTransformation.config)) {
          onTransformationUpdate(oldTransformation.id, newItem.data)
        }
      }
    })
  }

  return (
    <div style={{ padding: '16px', width: '100%', minHeight: '200px' }}>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="transformations"
          style={{ marginBottom: 0 }}
        >
          <FieldCollection
            registry={fieldCollectionRegistry}
            title={t('image-thumbnails.editor.transformations')}
            collapsed={false}
            onChange={handleTransformationsChange}
          />
        </Form.Item>
      </Form>
    </div>
  )
}