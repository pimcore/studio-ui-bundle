/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

export const convertHotspotToPixel = (hotspot: IHotspot, containerBounds: DOMRect): IHotspot => {
  return {
    ...hotspot,
    x: percentToPixel(hotspot.x, containerBounds.width),
    y: percentToPixel(hotspot.y, containerBounds.height),
    width: hotspot.type === 'marker' ? hotspot.width : percentToPixel(hotspot.width, containerBounds.width),
    height: hotspot.type === 'marker' ? hotspot.height : percentToPixel(hotspot.height, containerBounds.height)
  }
}

export const convertHotspotsToPixel = (hotspots: IHotspot[], containerBounds: DOMRect): IHotspot[] => {
  return hotspots.map(hotspot => convertHotspotToPixel(hotspot, containerBounds))
}

export const convertHotspotToPercent = (hotspot: IHotspot, containerBounds: DOMRect): IHotspot => {
  return {
    ...hotspot,
    x: pixelToPercent(hotspot.x, containerBounds.width),
    y: pixelToPercent(hotspot.y, containerBounds.height),
    width: hotspot.type === 'marker' ? hotspot.width : pixelToPercent(hotspot.width, containerBounds.width),
    height: hotspot.type === 'marker' ? hotspot.height : pixelToPercent(hotspot.height, containerBounds.height)
  }
}

const percentToPixel = (percent: number, dimension: number): number => {
  return (dimension * percent) / 100
}

const pixelToPercent = (pixel: number, dimension: number): number => {
  return (pixel * 100) / dimension
}
