/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { calculateThumbnailDimensions } from '../helpers/calculate-thumbnail-dimensions'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ThumbnailService, type CustomThumbnailDefinition, type DynamicThumbnailDefinition, type AssetType } from '@Pimcore/modules/asset/services/thumbnail-service'
import { isString, isObject } from 'lodash'

export interface ThumbnailSizeConfig {
  width?: number | string
  height?: number | string
  containerWidth: number
  thumbnailSettings?: Partial<CustomThumbnailDefinition>
  thumbnailConfig?: string | object
}

export interface ThumbnailUrlConfig extends ThumbnailSizeConfig {
  assetId: number
  fallbackSrc?: string
}

interface AssetThumbnailUrlConfig extends ThumbnailUrlConfig {
  assetType: AssetType
  defaultMimeType?: 'JPEG' | 'PNG'
}

/**
 * Thumbnail URL generation for assets with proper dimensions and settings
 * Priority: named thumbnails (string) -> dynamic config (object) -> custom thumbnails (fallback)
 */
export const generateThumbnailUrlForAssetType = (
  config: ThumbnailUrlConfig,
  assetType: AssetType,
  defaultMimeType: 'JPEG' | 'PNG' = 'JPEG'
): string | undefined => {
  return generateAssetThumbnailUrl({
    ...config,
    assetType,
    defaultMimeType
  })
}

const generateAssetThumbnailUrl = ({
  assetId,
  width,
  height,
  containerWidth,
  thumbnailSettings,
  thumbnailConfig,
  fallbackSrc,
  assetType,
  defaultMimeType = 'JPEG'
}: AssetThumbnailUrlConfig): string | undefined => {
  const thumbnailService = container.get<ThumbnailService>(serviceIds['Asset/ThumbnailService'])

  if (isString(thumbnailConfig)) {
    return thumbnailService.getThumbnailUrl({
      assetId,
      assetType,
      thumbnailName: thumbnailConfig,
      ...thumbnailSettings
    })
  }

  if (isObject(thumbnailConfig)) {
    const dynamicThumbnailDef: DynamicThumbnailDefinition = {
      assetId,
      assetType,
      dynamicConfig: thumbnailConfig as Record<string, any>,
      ...thumbnailSettings
    }
    return thumbnailService.getThumbnailUrl(dynamicThumbnailDef)
  }

  if (containerWidth <= 0) {
    return undefined
  }

  const { thumbnailWidth, thumbnailHeight, resizeMode } = calculateThumbnailDimensions({
    width,
    height,
    containerWidth
  })

  if (thumbnailWidth === undefined && thumbnailHeight === undefined) {
    return fallbackSrc
  }

  const defaultThumbnailSettings: Partial<CustomThumbnailDefinition> = {
    frame: false,
    resizeMode,
    mimeType: defaultMimeType,
    ...thumbnailSettings
  }

  if (thumbnailWidth !== undefined) {
    return thumbnailService.getThumbnailUrl({
      assetId,
      assetType,
      width: thumbnailWidth,
      height: thumbnailHeight,
      ...defaultThumbnailSettings
    })
  }

  if (thumbnailHeight !== undefined) {
    return thumbnailService.getThumbnailUrl({
      assetId,
      assetType,
      width: 0,
      height: thumbnailHeight,
      ...defaultThumbnailSettings
    })
  }

  return fallbackSrc
}
