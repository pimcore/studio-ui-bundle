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
  dy: number
): IHotspot[] => {
  const hotspot = convertHotspotToPixel(hotspots[hotspotIndex], containerBounds)
  let newWidth = resizeStart.width
  let newHeight = resizeStart.height
  let newX = hotspot.x
  let newY = hotspot.y

  if (resizeDirection?.includes('w') === true) {
    ({ newWidth, newX } = handleWestResize(resizeStart, hotspot, dx, evt, containerBounds, minSize))
  }
  if (resizeDirection?.includes('e') === true) {
    newWidth = Math.min(containerBounds.width - hotspot.x, Math.max(minSize, resizeStart.width + dx))
  }
  if (resizeDirection?.includes('n') === true) {
    ({ newHeight, newY } = handleNorthResize(resizeStart, hotspot, dy, evt, containerBounds, minSize))
  }
  if (resizeDirection?.includes('s') === true) {
    newHeight = Math.max(minSize, resizeStart.height + dy)
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
