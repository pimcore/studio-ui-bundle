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

import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

export const cropToHotspot = (crop?: CropSettings | null): IHotspot => {
  if (crop !== null && crop !== undefined) {
    if (crop.cropPercent === undefined || !crop.cropPercent) {
      console.error('Crop is only supported with cropPercent')
      return defaultHotspot
    }

    return {
      id: 1,
      x: crop.cropLeft ?? 0,
      y: crop.cropTop ?? 0,
      width: crop.cropWidth ?? 0,
      height: crop.cropHeight ?? 0,
      type: 'hotspot'
    }
  }
  return defaultHotspot
}

export const hotspotToCrop = (hotspot: IHotspot): CropSettings => {
  return {
    cropWidth: Math.round(hotspot.width),
    cropHeight: Math.round(hotspot.height),
    cropLeft: Math.round(hotspot.x),
    cropTop: Math.round(hotspot.y),
    cropPercent: true
  }
}

export const defaultCrop = (): CropSettings => hotspotToCrop(defaultHotspot)

const defaultHotspot: IHotspot = {
  id: 1,
  x: 10,
  y: 10,
  width: 80,
  height: 80,
  type: 'hotspot'
}
