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
import { type Rectangle } from '@Pimcore/components/hotspot-image/types/types'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

interface ResizeContext {
  evt: MouseEvent
  resizeStart: Rectangle
  hotspot: IHotspot
  containerBounds: DOMRect
  minSize: number
  dx: number
  dy: number
}

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

  const ctx: ResizeContext = {
    evt,
    resizeStart,
    hotspot,
    containerBounds,
    minSize,
    dx,
    dy
  }

  if (ratioX !== undefined && ratioY !== undefined && ratioX > 0 && ratioY > 0) {
    ({
      newWidth,
      newHeight,
      newX,
      newY
    } = resizeWithRatio(ctx, resizeDirection, ratioX / ratioY))
  } else {
    ({
      newWidth,
      newHeight,
      newX,
      newY
    } = resizeFree(ctx, resizeDirection))
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
  ctx: ResizeContext,
  resizeDirection: string,
  ratio: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  if (resizeDirection === 'e' || resizeDirection === 'w') {
    return resizeWithRatioHorizontal(ctx, resizeDirection, ratio)
  }

  if (resizeDirection === 's' || resizeDirection === 'n') {
    return resizeWithRatioVertical(ctx, resizeDirection, ratio)
  }

  if (resizeDirection.length > 1) {
    return resizeWithRatioCorner(ctx, resizeDirection, ratio)
  }

  return {
    newWidth: ctx.resizeStart.width,
    newHeight: ctx.resizeStart.height,
    newX: ctx.hotspot.x,
    newY: ctx.hotspot.y
  }
}

const resizeWithRatioHorizontal = (
  ctx: ResizeContext,
  resizeDirection: string,
  ratio: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  const { resizeStart, hotspot, containerBounds, minSize, dx } = ctx
  const newWidth = resizeDirection === 'e'
    ? Math.min(containerBounds.width - hotspot.x, Math.max(minSize, resizeStart.width + dx))
    : Math.max(minSize, resizeStart.width - dx)

  const newHeight = newWidth / ratio
  let newX = hotspot.x

  if (resizeDirection === 'w') {
    newX = resizeStart.x - containerBounds.left + (resizeStart.width - newWidth)
  }

  return { newWidth, newHeight, newX, newY: hotspot.y }
}

const resizeWithRatioVertical = (
  ctx: ResizeContext,
  resizeDirection: string,
  ratio: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  const { resizeStart, hotspot, containerBounds, minSize, dy } = ctx
  const newHeight = resizeDirection === 's'
    ? Math.max(minSize, resizeStart.height + dy)
    : Math.max(minSize, resizeStart.height - dy)

  const newWidth = newHeight * ratio
  let newY = hotspot.y

  if (resizeDirection === 'n') {
    newY = resizeStart.y - containerBounds.top + (resizeStart.height - newHeight)
  }

  return { newWidth, newHeight, newX: hotspot.x, newY }
}

const resizeWithRatioCorner = (
  ctx: ResizeContext,
  resizeDirection: string,
  ratio: number
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  const { resizeStart, hotspot, containerBounds, minSize, dx, dy } = ctx
  let newWidth = Math.max(minSize, resizeDirection.includes('e') ? resizeStart.width + dx : resizeStart.width - dx)
  let newHeight = Math.max(minSize, resizeDirection.includes('s') ? resizeStart.height + dy : resizeStart.height - dy)

  if (newWidth / newHeight > ratio) {
    newWidth = newHeight * ratio
  } else {
    newHeight = newWidth / ratio
  }

  let newX = hotspot.x
  let newY = hotspot.y

  if (resizeDirection.includes('w')) {
    newX = resizeStart.x - containerBounds.left + (resizeStart.width - newWidth)
  }
  if (resizeDirection.includes('n')) {
    newY = resizeStart.y - containerBounds.top + (resizeStart.height - newHeight)
  }

  return {
    newWidth,
    newHeight,
    newX,
    newY
  }
}

const resizeFree = (
  ctx: ResizeContext,
  resizeDirection: string
): { newWidth: number, newHeight: number, newX: number, newY: number } => {
  const { evt, resizeStart, hotspot, containerBounds, minSize, dx, dy } = ctx
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
