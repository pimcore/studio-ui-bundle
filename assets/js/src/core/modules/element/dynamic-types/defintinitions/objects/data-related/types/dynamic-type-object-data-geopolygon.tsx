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
import {
  getGeoComponentHeight, getGeoComponentWidth
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/utils/geo-types'
import { GeoPolyDrawer } from '@Pimcore/components/geo-poly-drawer/geo-poly-drawer'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type GeoPolygonObjectDataDefinition = AbstractObjectDataDefinition & {
  width: string
  height: string
  lat: number
  lng: number
  zoom: number
}

export class DynamicTypeObjectDataGeoPolygon extends DynamicTypeObjectDataAbstract {
  id: string = 'geopolygon'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'

  getObjectDataComponent (props: GeoPolygonObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <GeoPolyDrawer
        className={ props.className }
        disabled={ props.noteditable === true }
        height={ getGeoComponentHeight(props.height) }
        lat={ props.lat }
        lng={ props.lng }
        mode={ 'geoPolygon' }
        value={ props.value }
        width={ getGeoComponentWidth(props.width) }
        zoom={ props.zoom }
      />
    )
  }
}
