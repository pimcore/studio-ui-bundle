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
  type BackendMediaOrderFormat
} from '../types/media-query.types'
import { uuid } from '@Pimcore/utils/uuid'

export const convertToBackendFormat = (
  defaultTransformations: MediaQuery['transformations'],
  mediaSegments: MediaQuery[]
): {
  medias: BackendMediasFormat
  mediaOrder: BackendMediaOrderFormat
} => {
  const medias: BackendMediasFormat = {}
  const mediaOrder: BackendMediaOrderFormat = {}

  medias.default = defaultTransformations.map(t => ({
    method: t.type,
    arguments: t.config
  }))
  mediaOrder.default = 0

  mediaSegments.forEach((segment) => {
    const segmentName = (segment.query === '' ? `segment-${segment.id}` : segment.query) ?? `segment-${segment.id}`

    medias[segmentName] = segment.transformations.map((transformation) => ({
      method: transformation.type,
      arguments: transformation.config
    }))

    mediaOrder[segmentName] = segment.order
  })

  return { medias, mediaOrder }
}

export const convertFromBackendFormat = (
  medias: BackendMediasFormat = {},
  mediaOrder: BackendMediaOrderFormat = {}
): MediaQuery[] => {
  const mediaSegments: MediaQuery[] = []

  Object.entries(medias).forEach(([segmentName, transformations]) => {
    if (segmentName === 'default') {
      return
    }

    const segment: MediaQuery = {
      id: generateMediaQueryId(),
      query: segmentName,
      displayName: segmentName,
      transformations: transformations.map((t) => ({
        id: generateTransformationId(),
        type: t.method,
        config: t.arguments ?? {}
      })),
      order: (mediaOrder[segmentName] === 0 ? 0 : mediaOrder[segmentName]) ?? 0
    }

    mediaSegments.push(segment)
  })

  return mediaSegments.sort((a, b) => a.order - b.order)
}

export const generateMediaQueryId = (): string => {
  return `mq-${uuid()}`
}

export const generateTransformationId = (): string => {
  return `tr-${uuid()}`
}
