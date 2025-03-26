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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { GeoPointPicker } from '@Pimcore/components/geo-point-picker/geo-point-picker'
import {
  getGeoComponentHeight, getGeoComponentWidth
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/utils/geo-types'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { isNil } from 'lodash'
import { GeoPointList } from '../../grid-cell-preview/geo-point-list/geo-point-list'

export type GeoPointObjectDataDefinition = AbstractObjectDataDefinition & {
  width: string
  height: string
  lat: number
  lng: number
  zoom: number
}

export class DynamicTypeObjectDataGeoPoint extends DynamicTypeObjectDataAbstract {
  id: string = 'geopoint'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: GeoPointObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <GeoPointPicker
        className={ props.className }
        disabled={ props.noteditable === true }
        height={ getGeoComponentHeight(props.height) }
        lat={ props.lat }
        lng={ props.lng }
        value={ props.value }
        width={ getGeoComponentWidth(props.width) }
        zoom={ props.zoom }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: GeoPoint | null = props.cellProps.getValue()

    return isNil(value) ? <></> : <GeoPointList geoPoints={ [value] } />
  }
}
