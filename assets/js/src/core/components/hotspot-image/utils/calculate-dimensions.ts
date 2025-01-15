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

import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

export const convertHotspotToPixel = (hotspot: IHotspot, imageDimensions: { width: number, height: number }): IHotspot => {
  return {
    ...hotspot,
    x: percentToPixel(hotspot.x, imageDimensions.width),
    y: percentToPixel(hotspot.y, imageDimensions.height),
    width: hotspot.type === 'marker' ? hotspot.width : percentToPixel(hotspot.width, imageDimensions.width),
    height: hotspot.type === 'marker' ? hotspot.height : percentToPixel(hotspot.height, imageDimensions.height)
  }
}

export const convertHotspotsToPixel = (hotspots: IHotspot[], imageDimensions: { width: number, height: number }): IHotspot[] => {
  return hotspots.map(hotspot => convertHotspotToPixel(hotspot, imageDimensions))
}

export const convertHotspotToPercent = (hotspot: IHotspot, imageDimensions: { width: number, height: number }): IHotspot => {
  return {
    ...hotspot,
    x: pixelToPercent(hotspot.x, imageDimensions.width),
    y: pixelToPercent(hotspot.y, imageDimensions.height),
    width: hotspot.type === 'marker' ? hotspot.width : pixelToPercent(hotspot.width, imageDimensions.width),
    height: hotspot.type === 'marker' ? hotspot.height : pixelToPercent(hotspot.height, imageDimensions.height)
  }
}

const percentToPixel = (percent: number, dimension: number): number => {
  return (dimension * percent) / 100
}

const pixelToPercent = (pixel: number, dimension: number): number => {
  return (pixel * 100) / dimension
}
