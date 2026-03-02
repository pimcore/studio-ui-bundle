/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type MediaQuery,
  type BackendMediasFormat,
  type BackendMediaOrderFormat,
  type TransformationType
} from '../types/media-query.types'
import { uuid } from '@Pimcore/utils/uuid'

export const convertToBackendFormat = (mediaQueries: MediaQuery[]): {
  medias: BackendMediasFormat
  mediaOrder: BackendMediaOrderFormat
} => {
  const medias: BackendMediasFormat = {}
  const mediaOrder: BackendMediaOrderFormat = {}

  if (mediaQueries.length === 0) {
    medias.default = []
    mediaOrder.default = 0
    return { medias, mediaOrder }
  }

  mediaQueries.forEach((mediaQuery) => {
    const queryName = (mediaQuery.query === '' ? `media-${mediaQuery.id}` : mediaQuery.query) ?? `media-${mediaQuery.id}`

    medias[queryName] = mediaQuery.transformations.map((transformation) => ({
      method: transformation.type,
      arguments: transformation.config
    }))

    mediaOrder[queryName] = mediaQuery.order
  })

  return { medias, mediaOrder }
}

export const convertFromBackendFormat = (
  medias: BackendMediasFormat = {},
  mediaOrder: BackendMediaOrderFormat = {}
): MediaQuery[] => {
  const mediaQueries: MediaQuery[] = []

  Object.entries(medias).forEach(([queryName, transformations]) => {
    if (queryName === 'default') {
      return
    }

    const mediaQuery: MediaQuery = {
      id: generateMediaQueryId(),
      query: queryName,
      displayName: getDisplayName(queryName),
      transformations: transformations.map((t, index) => ({
        id: generateTransformationId(),
        type: t.method as TransformationType, // Direct usage with type casting
        config: t.arguments ?? {},
      })),
      order: (mediaOrder[queryName] === 0 ? 0 : mediaOrder[queryName]) ?? 0
    }

    mediaQueries.push(mediaQuery)
  })

  return mediaQueries.sort((a, b) => a.order - b.order)
}

export const getDisplayName = (query: string): string => {
  if (query.includes('min-width')) {
    const match = /min-width:\s*(\d+)/.exec(query)
    return (match === null) ? query : `≥ ${match[1]}px`
  }

  if (query.includes('max-width')) {
    const match = /max-width:\s*(\d+)/.exec(query)
    return (match === null) ? query : `≤ ${match[1]}px`
  }

  return query.length > 20 ? query.substring(0, 20) + '...' : query
}

/**
 * Generate unique ID for media query
 */
export const generateMediaQueryId = (): string => {
  return `mq-${uuid()}`
}

export const generateTransformationId = (): string => {
  return `tr-${uuid()}`
}
