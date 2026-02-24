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
import type { MediaQuery } from '../../types/media-query.types'

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
  
  // Handle transformation changes with a single, clean API call
  const handleTransformationsChange = useCallback((transformations: Array<{ type: string; data: any }>) => {
    const updatedMediaQuery: MediaQuery = {
      ...mediaQuery,
      transformations: transformations.map((t, index) => ({
        // Keep existing ID if available, generate new one if needed
        id: mediaQuery.transformations[index]?.id || `transformation-${Date.now()}-${index}`,
        type: t.type,
        config: t.data
      }))
    }
    
    onMediaQueryUpdate(updatedMediaQuery)
  }, [mediaQuery, onMediaQueryUpdate])

  return (
    <ItemProvider item={{ name: 'transformations' }}>
      <MediaQueryTransformationsField
        mediaQuery={mediaQuery}
        onChange={handleTransformationsChange}
        disabled={disabled}
      />
    </ItemProvider>
  )
}