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

interface PdfThumbnailSizeConfig {
  width?: number | string
  height?: number | string
  containerWidth: number
}

interface PdfThumbnailUrlConfig extends PdfThumbnailSizeConfig {
  assetId: number
  fallbackSrc?: string
}

/**
 * Generate PDF thumbnail URL using the assetDocumentStreamCustom API
 */
export const generatePdfThumbnailUrl = ({
  assetId,
  width,
  height,
  containerWidth,
  fallbackSrc
}: PdfThumbnailUrlConfig): string | undefined => {
  const { thumbnailWidth, thumbnailHeight, resizeMode } = calculateThumbnailDimensions({
    width,
    height,
    containerWidth
  })

  if (thumbnailWidth === undefined && thumbnailHeight === undefined) {
    return fallbackSrc
  }

  const params = new URLSearchParams({
    mimeType: 'JPEG',
    resizeMode
  })

  if (thumbnailWidth !== undefined) {
    params.append('width', thumbnailWidth.toString())
  }

  if (thumbnailHeight !== undefined) {
    params.append('height', thumbnailHeight.toString())
  }

  return `/pimcore-studio/api/assets/${assetId}/document/stream/custom?${params.toString()}`
}
