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
import { useTranslation } from 'react-i18next'
import { FieldCollection } from '@Pimcore/components/form/controls/field-collection/field-collection'
import { transformationFieldCollectionRegistry, initializeTransformationTypes } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { MediaQuery } from '../../types/media-query.types'

interface MediaQueryTransformationsFieldProps {
  mediaQuery: MediaQuery
  onChange: (transformations: Array<{ type: string, data: any }>) => void
}

export const MediaQueryTransformationsField = ({
  mediaQuery,
  onChange,
}: MediaQueryTransformationsFieldProps): React.JSX.Element => {
  const { t } = useTranslation()
  
  useEffect(() => {
    initializeTransformationTypes()
  }, [])

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

  return (
    <FieldCollection
      addButtonTranslationKey="image-thumbnails.media-queries.add-transformation"
      onChange={ handleChange }
      registry={ transformationFieldCollectionRegistry }
      title={ t('image-thumbnails.editor.transformations') }
      value={ transformationsData }
    />
  )
}
