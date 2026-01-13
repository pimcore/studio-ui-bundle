/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { MouseEvent } from 'react'
import {
  convertHotspotToPercent,
  convertHotspotToPixel
} from '@Pimcore/components/hotspot-image/utils/calculate-dimensions'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { type Rectangle } from '@Pimcore/components/hotspot-image/types/types'

export const resizeItem = (
  evt: MouseEvent,
  resizeStart: Rectangle,
  resizeDirection: string | null,
  containerBounds: DOMRect,
  hotspots: IHotspot[],
  hotspotIndex: number,
  minSize: number,
  dx: number,
  dy: number,
  ratioX?: number,
  ratioY?: number
): IHotspot[] => {
  const hotspot = convertHotspotToPixel(hotspots[hotspotIndex], containerBounds)
  let { width: newWidth, height: newHeight } = resizeStart
  let { x: newX, y: newY } = hotspot

  if (resizeDirection === null) {
    return hotspots
  }

  if (ratioX !== undefined && ratioY !== undefined && ratioX > 0 && ratioY > 0) {
    ({
      newWidth,
      newHeight,
      newX,
      newY
    } = resizeWithRatio(resizeStart, hotspot, resizeDirection, containerBounds, minSize, dx, dy, ratioX / ratioY))
  } else {
    ({
      newWidth,
      newHeight,
      newX,
      newY
    } = resizeFree(evt, resizeStart, hotspot, resizeDirection, containerBounds, minSize, dx, dy))
  }

  return hotspots.map((h, i) => i === hotspotIndex
    ? convertHotspotToPercent({
      ...h,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    }, containerBounds)
    : h)
}

const resizeWithRatio = (
  resizeStart: Rectangle,
  hotspot: IHotspot,
  resizeDirection: string,
  containerBounds: DOMRect,
  minSize: number,
  dx: number,
  dy: number,
  ratio: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  let { width: newWidth, height: newHeight } = resizeStart
  let { x: newX, y: newY } = hotspot

  if (resizeDirection === 'e' || resizeDirection === 'w') {
    newWidth = resizeDirection === 'e'
      ? Math.min(containerBounds.width - hotspot.x, Math.max(minSize, resizeStart.width + dx))
      : Math.max(minSize, resizeStart.width - dx)

    newHeight = newWidth / ratio

    if (resizeDirection === 'w') {
      newX = resizeStart.x - containerBounds.left + (resizeStart.width - newWidth)
    }
  } else if (resizeDirection === 's' || resizeDirection === 'n') {
    newHeight = resizeDirection === 's'
      ? Math.max(minSize, resizeStart.height + dy)
      : Math.max(minSize, resizeStart.height - dy)

    newWidth = newHeight * ratio

    if (resizeDirection === 'n') {
      newY = resizeStart.y - containerBounds.top + (resizeStart.height - newHeight)
    }
  } else if (resizeDirection.length > 1) {
    // Corner resize
    newWidth = Math.max(minSize, resizeDirection.includes('e') ? resizeStart.width + dx : resizeStart.width - dx)
    newHeight = Math.max(minSize, resizeDirection.includes('s') ? resizeStart.height + dy : resizeStart.height - dy)

    if (newWidth / newHeight > ratio) {
      newWidth = newHeight * ratio
    } else {
      newHeight = newWidth / ratio
    }

    if (resizeDirection.includes('w')) {
      newX = resizeStart.x - containerBounds.left + (resizeStart.width - newWidth)
    }
    if (resizeDirection.includes('n')) {
      newY = resizeStart.y - containerBounds.top + (resizeStart.height - newHeight)
    }
  }

  return {
    newWidth,
    newHeight,
    newX,
    newY
  }
}

const resizeFree = (
  evt: MouseEvent,
  resizeStart: Rectangle,
  hotspot: IHotspot,
  resizeDirection: string,
  containerBounds: DOMRect,
  minSize: number,
  dx: number,
  dy: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  let newWidth = resizeStart.width
  let newHeight = resizeStart.height
  let newX = hotspot.x
  let newY = hotspot.y

  if (resizeDirection.includes('w')) {
    ({ newWidth, newX } = handleWestResize(resizeStart, hotspot, dx, evt, containerBounds, minSize))
  }
  if (resizeDirection.includes('e')) {
    newWidth = Math.min(containerBounds.width - hotspot.x, Math.max(minSize, resizeStart.width + dx))
  }
  if (resizeDirection.includes('n')) {
    ({ newHeight, newY } = handleNorthResize(resizeStart, hotspot, dy, evt, containerBounds, minSize))
  }
  if (resizeDirection.includes('s')) {
    newHeight = Math.max(minSize, resizeStart.height + dy)
  }

  return {
    newWidth,
    newHeight,
    newX,
    newY
  }
}

const handleWestResize = (resizeStart: Rectangle, hotspot: IHotspot, dx: number, evt: MouseEvent, containerBounds: DOMRect, minSize: number): { newWidth: number, newX: number } => {
  const newWidth = Math.max(minSize, resizeStart.width - dx)
  let newX = Math.min(hotspot.x + resizeStart.width - minSize, evt.clientX - containerBounds.left)

  if (newWidth === minSize) {
    newX = hotspot.x + hotspot.width - minSize
  }

  return { newWidth, newX }
}

const handleNorthResize = (resizeStart: Rectangle, hotspot: IHotspot, dy: number, evt: MouseEvent, containerBounds: DOMRect, minSize: number): { newHeight: number, newY: number } => {
  const newHeight = Math.max(minSize, resizeStart.height - dy)
  let newY = Math.min(hotspot.y + resizeStart.height - minSize, evt.clientY - containerBounds.top)

  if (newHeight === minSize) {
    newY = hotspot.y + hotspot.height - minSize
  }

  return { newHeight, newY }
}
