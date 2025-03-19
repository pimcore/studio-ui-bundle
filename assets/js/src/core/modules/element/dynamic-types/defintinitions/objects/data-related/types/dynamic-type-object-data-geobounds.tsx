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
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  getGeoComponentHeight, getGeoComponentWidth
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/utils/geo-types'
import { GeoBoundsDrawer } from '@Pimcore/components/geo-bounds-drawer/geo-bounds-drawer'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type GeoBounds } from '@Pimcore/components/geo-map/types/geo-types'
import { isNil } from 'lodash'
import { GeoPointList } from '../../grid-cell-preview/geo-point-list/geo-point-list'

export type GeoBoundsObjectDataDefinition = AbstractObjectDataDefinition & {
  width: string
  height: string
  lat: number
  lng: number
  zoom: number
}

export class DynamicTypeObjectDataGeoBounds extends DynamicTypeObjectDataAbstract {
  id: string = 'geobounds'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: GeoBoundsObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <GeoBoundsDrawer
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
    const value: GeoBounds | null = props.cellProps.getValue()

    return isNil(value) ? <></> : <GeoPointList geoPoints={ [value.southWest, value.northEast] } />
  }
}
