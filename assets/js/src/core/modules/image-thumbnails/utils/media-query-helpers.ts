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

export const DEFAULT_MEDIA_QUERY_ID = 'default'

export const createDefaultMediaQuery = (): MediaQuery => ({
  id: DEFAULT_MEDIA_QUERY_ID,
  query: DEFAULT_MEDIA_QUERY_ID,
  displayName: DEFAULT_MEDIA_QUERY_ID,
  transformations: [],
  order: 0
})

export const convertToBackendFormat = (mediaQueries: MediaQuery[]): {
  medias: BackendMediasFormat
  mediaOrder: BackendMediaOrderFormat
} => {
  const medias: BackendMediasFormat = {}
  const mediaOrder: BackendMediaOrderFormat = {}

  const defaultEntry = mediaQueries.find(mq => mq.id === DEFAULT_MEDIA_QUERY_ID)

  if (defaultEntry === undefined) {
    medias.default = []
    mediaOrder.default = 0
  } else {
    medias.default = defaultEntry.transformations.map((transformation) => ({
      method: transformation.type,
      arguments: transformation.config
    }))
    mediaOrder.default = defaultEntry.order
  }

  mediaQueries.forEach((mediaQuery) => {
    if (mediaQuery.id === DEFAULT_MEDIA_QUERY_ID) {
      return
    }

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

  const defaultTransformations = medias[DEFAULT_MEDIA_QUERY_ID] ?? []
  const defaultEntry: MediaQuery = {
    id: DEFAULT_MEDIA_QUERY_ID,
    query: DEFAULT_MEDIA_QUERY_ID,
    displayName: DEFAULT_MEDIA_QUERY_ID,
    transformations: defaultTransformations.map((t) => ({
      id: generateTransformationId(),
      type: t.method as TransformationType,
      config: t.arguments ?? {}
    })),
    order: 0
  }

  Object.entries(medias).forEach(([queryName, transformations]) => {
    if (queryName === DEFAULT_MEDIA_QUERY_ID) {
      return
    }

    const mediaQuery: MediaQuery = {
      id: generateMediaQueryId(),
      query: queryName,
      displayName: getDisplayName(queryName),
      transformations: transformations.map((t) => ({
        id: generateTransformationId(),
        type: t.method as TransformationType,
        config: t.arguments ?? {}
      })),
      order: (mediaOrder[queryName] === 0 ? 0 : mediaOrder[queryName]) ?? 0
    }

    mediaQueries.push(mediaQuery)
  })

  mediaQueries.sort((a, b) => a.order - b.order)

  return [defaultEntry, ...mediaQueries]
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
