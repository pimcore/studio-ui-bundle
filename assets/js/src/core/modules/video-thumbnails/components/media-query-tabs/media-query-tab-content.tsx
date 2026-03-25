/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef } from 'react'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { VideoMediaQueryTransformationsField } from './media-query-transformations-field'
import type { MediaQuery } from '../../types/media-query.types'

interface VideoMediaQueryTabContentProps {
  mediaQuery: MediaQuery
  onMediaQueryUpdate: (updatedMediaQuery: MediaQuery) => void
}

export const VideoMediaQueryTabContent = ({
  mediaQuery,
  onMediaQueryUpdate
}: VideoMediaQueryTabContentProps): React.JSX.Element => {
  // Stable ID map: once a transformation gets an ID it keeps it across renders
  const idMapRef = useRef<Record<number, string>>({})

  const mediaQueryRef = useRef(mediaQuery)
  useEffect(() => {
    mediaQueryRef.current = mediaQuery
  })

  const handleTransformationsChange = useCallback((transformations: Array<{ type: string, data: any }>) => {
    const currentMediaQuery = mediaQueryRef.current
    const updatedMediaQuery: MediaQuery = {
      ...currentMediaQuery,
      transformations: transformations.map((t, index) => {
        const existingId = currentMediaQuery.transformations[index]?.id
        if (existingId !== '' && existingId != null) {
          idMapRef.current[index] = existingId
        } else {
          idMapRef.current[index] ??= `transformation-${crypto.randomUUID()}`
        }
        return {
          id: idMapRef.current[index],
          type: t.type,
          config: t.data
        }
      })
    }

    onMediaQueryUpdate(updatedMediaQuery)
  }, [onMediaQueryUpdate])

  return (
    <ItemProvider item={ { name: 'transformations' } }>
      <VideoMediaQueryTransformationsField
        mediaQuery={ mediaQuery }
        onChange={ handleTransformationsChange }
      />
    </ItemProvider>
  )
}
