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
  type Hotspot, type Marker
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { defaultStyleOptions, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'

export const convertHotspots = (hotspots: Hotspot[], markers: Marker[]): IHotspot[] => {
  const resultArray: IHotspot[] = []

  hotspots.forEach((hotspot) => {
    resultArray.push({
      id: resultArray.length + 1,
      x: hotspot.left,
      y: hotspot.top,
      width: hotspot.width,
      height: hotspot.height,
      type: 'hotspot'
    })
  })

  const style = defaultStyleOptions.marker
  markers.forEach((marker) => {
    resultArray.push({
      id: resultArray.length + 1,
      x: marker.left,
      y: marker.top,
      width: style.width,
      height: style.height,
      type: 'marker'
    })
  })
  return resultArray
}
