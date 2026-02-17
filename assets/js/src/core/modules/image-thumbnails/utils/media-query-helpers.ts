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
      method: transformation.type, // Direct usage - no need for redundant translation
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
          type: t.method as TransformationType, // Direct usage with type casting
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




function getTransformationLabel(method: string, args: Record<string, any> = {}): string {
  switch (method) {
    case 'resize':
      return `Resize ${args.width || '?'}x${args.height || '?'}`
    case 'scaleByHeight':
      return `Scale by Height ${args.height || '?'}px`
    case 'cover':
      return `Cover ${args.width || '?'}x${args.height || '?'}`
    case 'trim':
      return `Trim (tolerance: ${args.tolerance || 'not set'})`
    case 'sepia':
      return 'Sepia Effect'
    case 'grayscale':
      return 'Grayscale Effect'
    case 'sharpen':
      return 'Sharpen Effect'
    case 'contain':
      return `Contain ${args.width || '?'}x${args.height || '?'}`
    case 'crop':
      return `Crop ${args.width || '?'}x${args.height || '?'} at (${args.x || '?'}, ${args.y || '?'})`
    case 'frame':
      return `Frame ${args.width || '?'}x${args.height || '?'}`
    case 'rotate':
      return `Rotate ${args.angle || '?'}°`
    case 'mirror':
      return `Mirror ${args.mode || 'horizontal'}`
    case 'gaussianBlur':
      return `Gaussian Blur (radius: ${args.radius || '?'}, sigma: ${args.sigma || '?'})`
    case 'brightnessSaturation':
      return `Brightness/Saturation (${args.brightness || 100}%, ${args.saturation || 100}%, ${args.hue || 100}%)`
    case 'setBackgroundColor':
      return `Background Color: ${args.color || '#ffffff'}`
    case 'setBackgroundImage':
      return `Background Image ${args.path ? `(${args.path})` : ''}`
    case 'roundCorners':
      return `Round Corners ${args.width || 10}x${args.height || 10}px`
    case 'addOverlay':
      return `Add Overlay ${args.path ? `(${args.path})` : ''} at ${args.origin || 'top-left'}`
    case 'addOverlayFit':
      return `Add Overlay Fit ${args.path ? `(${args.path})` : ''} at ${args.origin || 'center'}`
    case 'applyMask':
      return `Apply Mask ${args.path ? `(${args.path})` : ''}`
    case 'tifforiginal':
      return 'TIFF Original'
    case '1x1_pixel':
      return '1x1 Pixel'
    default:
      return method
  }
}
/**
 * Generate unique ID for media query
 */
export function generateMediaQueryId(): string {
  return `mq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}


export function generateTransformationId(): string {
  return `tr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}