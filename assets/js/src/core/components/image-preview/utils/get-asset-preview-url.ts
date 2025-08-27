/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { createImageThumbnailUrl, type ImageThumbnailSettings } from './custom-image-thumbnail'

interface AssetPreviewUrlParams {
  assetId: number
  assetType?: 'image' | 'video'
  width: number
  height?: number
  thumbnailSettings?: ImageThumbnailSettings
}

export const getAssetPreviewUrl = ({
  assetId,
  assetType,
  width,
  height,
  thumbnailSettings
}: AssetPreviewUrlParams): string | undefined => {
  if (width === 0) {
    return undefined
  }

  if (assetType === 'video') {
    if (height === undefined) {
      return `${getPrefix()}/assets/${assetId}/video/stream/image-thumbnail?width=${width}&frame=true&aspectRatio=true`
    }
    return `${getPrefix()}/assets/${assetId}/video/stream/image-thumbnail?width=${width}&height=${height}&frame=true&aspectRatio=true`
  }

  const defaultSettings: ImageThumbnailSettings = {
    width,
    mimeType: 'JPEG',
    frame: true
  }

  if (height !== undefined) {
    defaultSettings.height = height
  }

  return createImageThumbnailUrl(assetId, {
    ...defaultSettings,
    ...thumbnailSettings
  })
}
