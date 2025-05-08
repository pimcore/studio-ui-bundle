/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  getGeoComponentHeight, getGeoComponentWidth
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/utils/geo-types'
import { GeoPolyDrawer } from '@Pimcore/components/geo-poly-drawer/geo-poly-drawer'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoPointList } from '../../grid-cell-preview/geo-point-list/geo-point-list'
import { isNil } from 'lodash'

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
  gridCellEditMode: EditMode = 'edit-modal'

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

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: GeoPoints | null = props.cellProps.getValue()

    return isNil(value) ? <></> : <GeoPointList geoPoints={ value } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 250
  }
}
