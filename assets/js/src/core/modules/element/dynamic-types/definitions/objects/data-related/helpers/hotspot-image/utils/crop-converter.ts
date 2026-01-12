/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

export const enforceRatio = (hotspot: IHotspot, ratioX?: number, ratioY?: number, imageRatio: number = 1): IHotspot => {
  if (ratioX !== undefined && ratioY !== undefined && ratioX > 0 && ratioY > 0) {
    const targetPercentageRatio = (ratioX / ratioY) / imageRatio
    const currentRatio = hotspot.width / hotspot.height

    if (Math.abs(currentRatio - targetPercentageRatio) > 0.001) {
      // Enforce ratio by adjusting height or width
      if (currentRatio > targetPercentageRatio) {
        // Too wide, reduce width
        return { ...hotspot, width: hotspot.height * targetPercentageRatio }
      } else {
        // Too tall, reduce height
        return { ...hotspot, height: hotspot.width / targetPercentageRatio }
      }
    }
  }
  return hotspot
}

export const cropToHotspot = (crop?: CropSettings | null, ratioX?: number, ratioY?: number, imageRatio: number = 1): IHotspot => {
  if (crop !== null && crop !== undefined && Object.keys(crop).length > 0) {
    if (crop.cropPercent === undefined || !crop.cropPercent) {
      console.error('Crop is only supported with cropPercent')
      return defaultHotspot(ratioX, ratioY, imageRatio)
    }

    const hotspot: IHotspot = {
      id: 1,
      x: crop.cropLeft ?? 0,
      y: crop.cropTop ?? 0,
      width: crop.cropWidth ?? 0,
      height: crop.cropHeight ?? 0,
      type: 'hotspot'
    }

    return enforceRatio(hotspot, ratioX, ratioY, imageRatio)
  }
  return defaultHotspot(ratioX, ratioY, imageRatio)
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

export const defaultCrop = (ratioX?: number, ratioY?: number, imageRatio: number = 1): CropSettings => hotspotToCrop(defaultHotspot(ratioX, ratioY, imageRatio))

const defaultHotspot = (ratioX?: number, ratioY?: number, imageRatio: number = 1): IHotspot => {
  let width = 80
  let height = 80

  if (ratioX !== undefined && ratioY !== undefined && ratioX > 0 && ratioY > 0) {
    const targetPercentageRatio = (ratioX / ratioY) / imageRatio
    if (targetPercentageRatio > 1) {
      height = width / targetPercentageRatio
    } else {
      width = height * targetPercentageRatio
    }

    // Ensure it fits within the 100x100 percentage area
    if (width > 100) {
      width = 100
      height = width / targetPercentageRatio
    }
    if (height > 100) {
      height = 100
      width = height * targetPercentageRatio
    }
  }

  return {
    id: 1,
    x: (100 - width) / 2,
    y: (100 - height) / 2,
    width,
    height,
    type: 'hotspot'
  }
}
