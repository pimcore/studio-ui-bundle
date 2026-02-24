/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useCallback, useEffect } from 'react'
import { FieldCollection } from '@Pimcore/components/form/controls/field-collection/field-collection'
import { TransformationFieldCollectionRegistry } from '../../registries/transformation-field-collection-registry'
import { transformationDynamicTypeRegistry, initializeTransformationTypes } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { MediaQuery } from '../../types/media-query.types'

interface MediaQueryTransformationsFieldProps {
  mediaQuery: MediaQuery
  onChange: (transformations: Array<{ type: string; data: any }>) => void
  disabled?: boolean
}

export const MediaQueryTransformationsField = ({
  mediaQuery,
  onChange,
  disabled = false
}: MediaQueryTransformationsFieldProps): React.JSX.Element => {

  useEffect(() => {
    initializeTransformationTypes()
  }, [])

  const fieldCollectionRegistry = useMemo(() => {
    return new TransformationFieldCollectionRegistry(transformationDynamicTypeRegistry)
  }, [])

  const transformationsData = useMemo(() => 
    mediaQuery.transformations.map(transformation => ({
      type: transformation.type,
      data: transformation.config || {}
    })), 
    [mediaQuery.transformations]
  )

  const handleChange = useCallback((newTransformations: Array<{ type: string; data: any }> | undefined) => {
    if (newTransformations !== undefined) {
      onChange(newTransformations)
    }
  }, [onChange])

  return (
    <FieldCollection
      value={transformationsData}
      onChange={handleChange}
      registry={fieldCollectionRegistry}
      disabled={disabled}
      style={{ width: '100%' }}
    />
  )
}