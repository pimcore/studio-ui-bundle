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
import {
  convertHotspotToPercent,
  convertHotspotToPixel
} from '@Pimcore/components/hotspot-image/utils/calculate-dimensions'
import type { MouseEvent } from 'react'
import { type Coordinates } from '@Pimcore/components/hotspot-image/types/types'

export const dragItem = (
  evt: MouseEvent,
  dragStart: Coordinates,
  containerBounds: DOMRect,
  hotspots: IHotspot[],
  hotspotIndex: number,
  marginLeft: number,
  marginTop: number
): IHotspot[] => {
  const hotspot = convertHotspotToPixel(hotspots[hotspotIndex], containerBounds)
  const newX = Math.min(containerBounds.width - hotspot.width, Math.max(0, evt.clientX - containerBounds.left - dragStart.x)) - marginLeft
  const newY = Math.min(containerBounds.height - hotspot.height, Math.max(0, evt.clientY - containerBounds.top - dragStart.y)) - marginTop

  return hotspots.map((h, i) => i === hotspotIndex ? convertHotspotToPercent({ ...h, x: newX, y: newY, width: hotspot.width, height: hotspot.height }, containerBounds) : h)
}
