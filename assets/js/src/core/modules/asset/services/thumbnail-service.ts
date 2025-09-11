/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isNil, isBoolean, isNumber, isUndefined, isEmpty } from 'lodash'

export type AssetType = 'image' | 'document' | 'video'

export interface BaseThumbnailDefinition {
  assetId: number
  assetType: AssetType
}

export interface NamedThumbnailDefinition extends BaseThumbnailDefinition {
  thumbnailName: string
  // Optional mimeType for image thumbnails
  mimeType?: 'JPEG' | 'PNG' | 'source' | 'original' | 'print'
  // Optional crop parameters for named thumbnails
  cropPercent?: boolean
  cropWidth?: number
  cropHeight?: number
  cropTop?: number
  cropLeft?: number
  // Document and video specific
  page?: number
}

export interface CustomThumbnailDefinition extends BaseThumbnailDefinition {
  mimeType?: 'JPEG' | 'PNG'
  resizeMode?: 'scaleByHeight' | 'scaleByWidth' | 'resize' | 'none'
  width?: number
  height?: number
  quality?: number
  dpi?: number
  contain?: boolean
  frame?: boolean
  aspectRatio?: boolean
  async?: boolean
  cover?: boolean
  forceResize?: boolean
  cropPercent?: boolean
  cropWidth?: number
  cropHeight?: number
  cropTop?: number
  cropLeft?: number
  // Document specific
  page?: number
}

export interface DynamicThumbnailDefinition extends BaseThumbnailDefinition {
  dynamicConfig: Record<string, any>
  // Optional crop parameters that will be injected into dynamicConfig
  cropPercent?: boolean
  cropWidth?: number
  cropHeight?: number
  cropTop?: number
  cropLeft?: number
}

export type ThumbnailDefinition = NamedThumbnailDefinition | DynamicThumbnailDefinition | CustomThumbnailDefinition

// Parameter lists for different thumbnail endpoints
const NAMED_THUMBNAIL_PARAMS: Array<keyof NamedThumbnailDefinition> = [
  'mimeType', 'page', 'cropPercent', 'cropWidth', 'cropHeight', 'cropTop', 'cropLeft'
]

const CUSTOM_THUMBNAIL_PARAMS: Array<keyof CustomThumbnailDefinition> = [
  'mimeType', 'resizeMode', 'width', 'height', 'quality', 'dpi', 'contain', 'frame', 'cover', 'forceResize', 'page',
  'cropPercent', 'cropWidth', 'cropHeight', 'cropTop', 'cropLeft'
]

const VIDEO_PARAMS: Array<keyof CustomThumbnailDefinition> = [
  'width', 'height', 'aspectRatio', 'frame', 'async'
]

@injectable()
export class ThumbnailService {
  /**
   * Generate thumbnail URL based on the thumbnail definition.
   * Priority: named thumbnails -> dynamic config -> custom thumbnails.
   * Always returns a URL string for the thumbnail.
   */
  getThumbnailUrl (definition: ThumbnailDefinition): string {
    if ('thumbnailName' in definition && !isEmpty(definition.thumbnailName)) {
      return this.generateNamedThumbnailUrl(definition)
    } else if ('dynamicConfig' in definition && !isNil(definition.dynamicConfig)) {
      return this.generateDynamicThumbnailUrl(definition)
    } else {
      return this.generateCustomThumbnailUrl(definition as CustomThumbnailDefinition)
    }
  }

  private generateNamedThumbnailUrl (definition: NamedThumbnailDefinition): string {
    const { assetId, assetType, thumbnailName } = definition
    const baseUrl = `${getPrefix()}/assets/${assetId}`
    let path: string
    let params: URLSearchParams

    if (assetType === 'video') {
      throw new Error('Video assets do not support named thumbnails. Use custom thumbnail instead.')
    } else {
      path = `/${assetType}/stream/thumbnail/${thumbnailName}`
      params = this.buildQueryParams(definition, NAMED_THUMBNAIL_PARAMS)
    }

    const queryString = params.toString()
    return `${baseUrl}${path}${!isEmpty(queryString) ? `?${queryString}` : ''}`
  }

  private generateDynamicThumbnailUrl (definition: DynamicThumbnailDefinition): string {
    const { assetId, assetType, dynamicConfig } = definition
    const baseUrl = `${getPrefix()}/assets/${assetId}`

    if (assetType === 'video') {
      throw new Error('Video assets do not support dynamic thumbnails. Use custom thumbnail instead.')
    }

    const path = `/${assetType}/stream/dynamic`
    const params = new URLSearchParams()

    // Merge dynamic config with any crop settings from the definition
    const finalConfig = { ...dynamicConfig }

    // Inject crop settings if they exist in the definition
    const cropKeys = ['cropPercent', 'cropWidth', 'cropHeight', 'cropTop', 'cropLeft'] as const
    cropKeys.forEach(key => {
      if (key in definition && !isNil(definition[key as keyof DynamicThumbnailDefinition])) {
        finalConfig[key] = definition[key as keyof DynamicThumbnailDefinition]
      }
    })
    console.log('Generate dynamic thumbnail with config:', finalConfig, definition)
    params.set('config', JSON.stringify(finalConfig))

    const queryString = params.toString()
    return `${baseUrl}${path}?${queryString}`
  }

  private generateCustomThumbnailUrl (definition: CustomThumbnailDefinition): string {
    const { assetId, assetType } = definition
    const baseUrl = `${getPrefix()}/assets/${assetId}`
    let path: string
    let params: URLSearchParams

    if (assetType === 'video') {
      path = '/video/stream/image-thumbnail'
      params = this.buildQueryParams(definition, VIDEO_PARAMS)
    } else {
      path = `/${assetType}/stream/custom`
      params = this.buildQueryParams(definition, CUSTOM_THUMBNAIL_PARAMS)

      if (isUndefined(definition.resizeMode)) {
        const defaultResizeMode = assetType === 'document' ? 'resize' : 'none'
        params.set('resizeMode', defaultResizeMode)
      }

      if (isUndefined(definition.mimeType)) {
        params.set('mimeType', 'JPEG')
      }
    }

    const queryString = params.toString()
    return `${baseUrl}${path}${!isEmpty(queryString) ? `?${queryString}` : ''}`
  }

  private buildQueryParams (definition: Record<string, any>, keys: string[]): URLSearchParams {
    const searchParams = new URLSearchParams()

    keys.forEach(key => {
      const value = definition[key]
      if (!isNil(value)) {
        if (isBoolean(value)) {
          if (value) {
            searchParams.append(key, 'true')
          }
        } else if (isNumber(value)) {
          searchParams.append(key, Math.round(value).toString())
        } else {
          searchParams.append(key, String(value))
        }
      }
    })

    return searchParams
  }
}
