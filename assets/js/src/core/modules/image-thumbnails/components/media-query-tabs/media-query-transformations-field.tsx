/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldCollection } from '@Pimcore/components/form/controls/field-collection/field-collection'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type TransformationFieldCollectionRegistry } from '../../registries/transformation-field-collection-registry'
import type { MediaQuery } from '../../types/media-query.types'

interface MediaQueryTransformationsFieldProps {
  mediaQuery: MediaQuery
  onChange: (transformations: Array<{ type: string, data: any }>) => void
}

export const MediaQueryTransformationsField = ({
  mediaQuery,
  onChange
}: MediaQueryTransformationsFieldProps): React.JSX.Element => {
  const { t } = useTranslation()

  const transformationsData = useMemo(() =>
    mediaQuery.transformations.map(transformation => ({
      type: transformation.type,
      data: transformation.config ?? {}
    })),
  [mediaQuery.transformations]
  )

  const handleChange = useCallback((newTransformations: Array<{ type: string, data: any }> | undefined) => {
    if (newTransformations != null) {
      onChange(newTransformations)
    }
  }, [onChange])

  const fieldCollectionRegistry = useMemo(
    () => container.get<TransformationFieldCollectionRegistry>(serviceIds['DynamicTypes/TransformationFieldCollectionRegistry']),
    []
  )

  return (
    <FieldCollection
      addLabel={ t('image-thumbnails.transformations.add') }
      onChange={ handleChange }
      registry={ fieldCollectionRegistry }
      title={ t('image-thumbnails.editor.transformations') }
      value={ transformationsData }
    />
  )
}
