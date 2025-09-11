/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { calculateThumbnailDimensions } from '../../../helpers/calculate-thumbnail-dimensions'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ThumbnailService, type CustomThumbnailDefinition } from '@Pimcore/modules/asset/services/thumbnail-service'
import { isString, isObject } from 'lodash'

interface ThumbnailSizeConfig {
  width?: number | string
  height?: number | string
  containerWidth: number
  thumbnailSettings?: Partial<CustomThumbnailDefinition>
  thumbnailConfig?: string | object
}

interface ThumbnailUrlConfig extends ThumbnailSizeConfig {
  assetId: number
  assetType: 'image' | 'video'
  fallbackSrc?: string
}

/**
 * Generate thumbnail URL for asset with proper dimensions and settings
 * Priority: named thumbnails (string) -> dynamic config (object) -> custom thumbnails (fallback)
 */
export const generateThumbnailUrl = ({
  assetId,
  assetType,
  width,
  height,
  containerWidth,
  thumbnailSettings,
  thumbnailConfig,
  fallbackSrc
}: ThumbnailUrlConfig): string | null | undefined => {
  const thumbnailService = container.get<ThumbnailService>(serviceIds['Asset/ThumbnailService'])

  // If thumbnail config is a string, use named thumbnail
  if (isString(thumbnailConfig)) {
    return thumbnailService.getThumbnailUrl({
      assetId,
      assetType,
      thumbnailName: thumbnailConfig,
      ...thumbnailSettings
    })
  }

  // If thumbnail config is an object, use dynamic thumbnail
  if (isObject(thumbnailConfig)) {
    return thumbnailService.getThumbnailUrl({
      assetId,
      assetType,
      dynamicConfig: thumbnailConfig as Record<string, any>,
      ...thumbnailSettings
    })
  }

  // For custom thumbnails, calculate dimensions and use thumbnail service
  const { thumbnailWidth, thumbnailHeight, resizeMode } = calculateThumbnailDimensions({
    width,
    height,
    containerWidth
  })

  if (thumbnailWidth === undefined && thumbnailHeight === undefined) {
    // Return null when no dimensions are available to prevent loading images with wrong dimensions
    // This allows the component to wait for proper container measurements
    return null
  }

  const defaultThumbnailSettings: Partial<CustomThumbnailDefinition> = {
    frame: false,
    resizeMode,
    mimeType: 'PNG',
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
