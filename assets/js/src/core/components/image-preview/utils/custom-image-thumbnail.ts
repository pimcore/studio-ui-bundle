/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface ImageThumbnailSettings {
  mimeType?: 'JPEG' | 'PNG'
  resizeMode?: 'scaleByHeight' | 'scaleByWidth' | 'resize' | 'none'
  width?: number
  height?: number
  quality?: number
  dpi?: number
  contain?: boolean
  frame?: boolean
  cover?: boolean
  forceResize?: boolean
  cropWidth?: number
  cropHeight?: number
  cropTop?: number
  cropLeft?: number
  cropPercent?: boolean
}

export const createImageThumbnailUrl = (assetId: number, settings: ImageThumbnailSettings): string => {
  const {
    mimeType,
    resizeMode = 'none',
    width,
    height,
    quality,
    dpi,
    contain = false,
    frame = false,
    cover = false,
    forceResize = false,
    cropWidth,
    cropHeight,
    cropTop,
    cropLeft,
    cropPercent = false
  } = settings

  const params = new URLSearchParams()

  if (mimeType !== undefined) {
    params.append('mimeType', mimeType)
  }
  params.append('resizeMode', resizeMode)
  if (width !== undefined) {
    params.append('width', width.toString())
  }
  if (height !== undefined) {
    params.append('height', height.toString())
  }
  if (quality !== undefined) {
    params.append('quality', quality.toString())
  }
  if (dpi !== undefined) {
    params.append('dpi', dpi.toString())
  }
  if (contain) {
    params.append('contain', contain.toString())
  }
  if (frame) {
    params.append('frame', frame.toString())
  }
  if (cover) {
    params.append('cover', cover.toString())
  }
  if (forceResize) {
    params.append('forceResize', forceResize.toString())
  }
  if (cropPercent) {
    params.append('cropPercent', cropPercent.toString())
  }
  if (cropWidth !== undefined) {
    params.append('cropWidth', Math.round(cropWidth).toString())
  }
  if (cropHeight !== undefined) {
    params.append('cropHeight', Math.round(cropHeight).toString())
  }
  if (cropTop !== undefined) {
    params.append('cropTop', Math.round(cropTop).toString())
  }
  if (cropLeft !== undefined) {
    params.append('cropLeft', Math.round(cropLeft).toString())
  }

  return `${getPrefix()}/assets/${assetId}/image/stream/custom?${params.toString()}`
}
