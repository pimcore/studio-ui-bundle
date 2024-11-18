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

import React from 'react'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import { GeoPointPicker } from '@Pimcore/components/geo-point-picker/geo-point-picker'

export type GeoPointObjectDataDefinition = AbstractObjectDataDefinition & {
  width: string
  height: string
  lat: number
  lng: number
  zoom: number
}

export class DynamicTypeObjectDataGeoPoint extends DynamicTypeObjectDataAbstract {
  id: string = 'geopoint'

  getObjectDataComponent (props: GeoPointObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const width = props.width !== '' ? props.width : '500px'
    const height = props.height !== '' ? props.height : '250px'

    return (
      <GeoPointPicker
        height={ height }
        lat={ props.lat }
        lng={ props.lng }
        width={ width }
        zoom={ props.zoom }
      />
    )
  }
}
