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
import { isNil } from 'lodash'

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

  const roundedWidth = Math.round(width)
  const roundedHeight = !isNil(height) ? Math.round(height) : undefined

  if (assetType === 'video') {
    if (isNil(height)) {
      return `${getPrefix()}/assets/${assetId}/video/stream/image-thumbnail?width=${roundedWidth}&frame=true&aspectRatio=true`
    }
    return `${getPrefix()}/assets/${assetId}/video/stream/image-thumbnail?width=${roundedWidth}&height=${roundedHeight}&frame=true&aspectRatio=true`
  }

  const defaultSettings: ImageThumbnailSettings = {
    width: roundedWidth,
    mimeType: 'JPEG',
    frame: true
  }

  if (!isNil(height)) {
    defaultSettings.height = roundedHeight
  }

  return createImageThumbnailUrl(assetId, {
    ...defaultSettings,
    ...thumbnailSettings
  })
}
