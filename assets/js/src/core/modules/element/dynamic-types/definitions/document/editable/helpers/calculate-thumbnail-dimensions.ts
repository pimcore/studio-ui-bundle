/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface ThumbnailSizeConfig {
  width?: number | string
  height?: number | string
  containerWidth: number
}

interface ThumbnailDimensions {
  thumbnailWidth?: number
  thumbnailHeight?: number
  resizeMode: 'resize' | 'none' | 'scaleByHeight' | 'scaleByWidth'
}

/**
 * Calculate thumbnail dimensions based on configuration
 *
 * Rules:
 * - no width and height given: use containerWidth
 * - width given: use scaleByWidth with width
 * - no width given but height given: use scaleByHeight with height
 */
export const calculateThumbnailDimensions = ({ width, height, containerWidth }: ThumbnailSizeConfig): ThumbnailDimensions => {
  if (width === undefined && height === undefined) {
    return {
      thumbnailWidth: containerWidth,
      resizeMode: 'scaleByWidth'
    }
  }

  if (width !== undefined) {
    return {
      thumbnailWidth: typeof width === 'string' ? parseInt(width) : width,
      resizeMode: 'scaleByWidth'
    }
  }

  if (height !== undefined) {
    return {
      thumbnailHeight: typeof height === 'string' ? parseInt(height) : height,
      resizeMode: 'scaleByHeight'
    }
  }

  return {
    resizeMode: 'none'
  }
}
