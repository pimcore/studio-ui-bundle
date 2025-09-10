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
import { isNil, isBoolean, isNumber, isUndefined } from 'lodash'

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

export type ThumbnailDefinition = NamedThumbnailDefinition | CustomThumbnailDefinition

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
   * Auto-detects between named and custom thumbnails based on presence of thumbnailName.
   * Always returns a URL string for the thumbnail.
   */
  getThumbnailUrl(definition: ThumbnailDefinition): string {
    if ('thumbnailName' in definition && definition.thumbnailName) {
      return this.generateNamedThumbnailUrl(definition)
    } else {
      return this.generateCustomThumbnailUrl(definition as CustomThumbnailDefinition)
    }
  }

  private generateNamedThumbnailUrl(definition: NamedThumbnailDefinition): string {
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
    return `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`
  }

  private generateCustomThumbnailUrl(definition: CustomThumbnailDefinition): string {
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
        params.set('mimeType', 'PNG')
      }
    }

    const queryString = params.toString()
    return `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`
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
