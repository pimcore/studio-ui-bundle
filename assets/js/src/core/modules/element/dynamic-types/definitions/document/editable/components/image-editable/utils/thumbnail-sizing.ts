/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ImageThumbnailSettings } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { getAssetPreviewUrl } from '@Pimcore/components/image-preview/utils/get-asset-preview-url'
import { calculateThumbnailDimensions } from '../../../helpers/calculate-thumbnail-dimensions'

interface ThumbnailSizeConfig {
  width?: number | string
  height?: number | string
  containerWidth: number
  thumbnailSettings?: ImageThumbnailSettings
}

interface ThumbnailUrlConfig extends ThumbnailSizeConfig {
  assetId: number
  assetType?: 'image' | 'video'
  fallbackSrc?: string
}

/**
 * Generate thumbnail URL for asset with proper dimensions and settings
 */
export const generateThumbnailUrl = ({
  assetId,
  assetType,
  width,
  height,
  containerWidth,
  thumbnailSettings,
  fallbackSrc
}: ThumbnailUrlConfig): string | undefined => {
  const { thumbnailWidth, thumbnailHeight, resizeMode } = calculateThumbnailDimensions({
    width,
    height,
    containerWidth
  })

  if (thumbnailWidth === undefined && thumbnailHeight === undefined) {
    return fallbackSrc
  }

  const defaultThumbnailSettings: ImageThumbnailSettings = {
    frame: false,
    resizeMode,
    ...thumbnailSettings
  }

  if (thumbnailWidth !== undefined) {
    return getAssetPreviewUrl({
      assetId,
      assetType,
      width: thumbnailWidth,
      height: thumbnailHeight,
      thumbnailSettings: defaultThumbnailSettings
    })
  }

  if (thumbnailHeight !== undefined) {
    return getAssetPreviewUrl({
      assetId,
      assetType,
      width: 0,
      height: thumbnailHeight,
      thumbnailSettings: defaultThumbnailSettings
    })
  }

  return fallbackSrc
}
