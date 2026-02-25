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
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { MediaQueryTransformationsField } from './media-query-transformations-field'
import type { MediaQuery, TransformationType } from '../../types/media-query.types'

interface MediaQueryTabContentProps {
  mediaQuery: MediaQuery
  onMediaQueryUpdate: (updatedMediaQuery: MediaQuery) => void
  disabled?: boolean
}

export const MediaQueryTabContent = ({
  mediaQuery,
  onMediaQueryUpdate,
  disabled = false
}: MediaQueryTabContentProps): React.JSX.Element => {
  const handleTransformationsChange = useCallback((transformations: Array<{ type: string, data: any }>) => {
    const updatedMediaQuery: MediaQuery = {
      ...mediaQuery,
      transformations: transformations.map((t, index) => ({
        id: (mediaQuery.transformations[index]?.id !== '' ? mediaQuery.transformations[index]?.id : `transformation-${Date.now()}-${index}`) ?? `transformation-${Date.now()}-${index}`,
        type: t.type as TransformationType,
        config: t.data
      }))
    }

    onMediaQueryUpdate(updatedMediaQuery)
  }, [mediaQuery, onMediaQueryUpdate])

  return (
    <ItemProvider item={ { name: 'transformations' } }>
      <MediaQueryTransformationsField
        disabled={ disabled }
        mediaQuery={ mediaQuery }
        onChange={ handleTransformationsChange }
      />
    </ItemProvider>
  )
}
