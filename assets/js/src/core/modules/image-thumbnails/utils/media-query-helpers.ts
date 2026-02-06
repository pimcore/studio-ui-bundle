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
  type Transformation, 
  type BackendMediasFormat, 
  type BackendMediaOrderFormat,
  type TransformationType 
} from '../types/media-query.types'


export function convertToBackendFormat(mediaQueries: MediaQuery[]): {
  medias: BackendMediasFormat
  mediaOrder: BackendMediaOrderFormat
} {
  const medias: BackendMediasFormat = {}
  const mediaOrder: BackendMediaOrderFormat = {}

  if (mediaQueries.length === 0) {
    medias.default = []
    mediaOrder.default = 0
    return { medias, mediaOrder }
  }

  mediaQueries.forEach((mediaQuery) => {
    const queryName = mediaQuery.query || `media-${mediaQuery.id}`
    
    medias[queryName] = mediaQuery.transformations.map((transformation) => ({
      method: getBackendMethodName(transformation),
      arguments: transformation.config
    }))

    mediaOrder[queryName] = mediaQuery.order
  })

  return { medias, mediaOrder }
}


export function convertFromBackendFormat(
  medias: BackendMediasFormat = {},
  mediaOrder: BackendMediaOrderFormat = {}
): MediaQuery[] {
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
        type: getFrontendTransformationType(t.method),
        subtype: getEffectSubtype(t.method),
        config: t.arguments || {},
        label: getTransformationLabel(t.method, t.arguments)
      })),
      order: mediaOrder[queryName] || 0
    }

    mediaQueries.push(mediaQuery)
  })

  return mediaQueries.sort((a, b) => a.order - b.order)
}


function getDisplayName(query: string): string {
  if (query.includes('min-width')) {
    const match = query.match(/min-width:\s*(\d+)/)
    return match ? `≥ ${match[1]}px` : query
  }
  
  if (query.includes('max-width')) {
    const match = query.match(/max-width:\s*(\d+)/)
    return match ? `≤ ${match[1]}px` : query
  }
  
  return query.length > 20 ? query.substring(0, 20) + '...' : query
}


function getBackendMethodName(transformation: Transformation): string {
  const typeMap: Record<string, string> = {
    'cover': 'cover',
    'resize': 'resize',
    'scaleByWidth': 'scaleByWidth',
    'scale-by-height': 'scaleByHeight', 
    'trim': 'trim',
    'effects': getEffectMethodName(transformation.subtype)
  }

  return typeMap[transformation.type] || transformation.type
}


function getFrontendTransformationType(method: string): TransformationType {
  const methodMap: Record<string, TransformationType> = {
    'cover': 'cover',
    'resize': 'resize',
    'scaleByHeight': 'scale-by-height',
    'scaleByWidth': 'scaleByWidth',
    'trim': 'trim',
    'sepia': 'effects',
    'grayscale': 'effects', 
    'sharpen': 'effects'
  }

  return methodMap[method] || 'resize'
}

function getEffectSubtype(method: string): 'sepia' | 'grayscale' | 'sharpen' | undefined {
  const effectsMap: Record<string, 'sepia' | 'grayscale' | 'sharpen'> = {
    'sepia': 'sepia',
    'grayscale': 'grayscale',
    'sharpen': 'sharpen'
  }

  return effectsMap[method]
}


function getEffectMethodName(subtype?: string): string {
  return subtype || 'sepia' // Default to sepia if no subtype
}


function getTransformationLabel(method: string, args: Record<string, any> = {}): string {
  switch (method) {
    case 'resize':
      return `Resize ${args.width || '?'}x${args.height || '?'}`
    case 'scaleByHeight':
      return `Scale by Height ${args.height || '?'}px`
    case 'trim':
      const trimTypes = ['Disabled', 'Left', 'Right', 'Both']
      return `Trim ${trimTypes[args.trim] || 'Unknown'}`
    case 'sepia':
      return 'Sepia Effect'
    case 'grayscale':
      return 'Grayscale Effect'
    case 'sharpen':
      return 'Sharpen Effect'
    default:
      return method
  }
}

/
export function generateMediaQueryId(): string {
  return `mq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}


export function generateTransformationId(): string {
  return `tr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}