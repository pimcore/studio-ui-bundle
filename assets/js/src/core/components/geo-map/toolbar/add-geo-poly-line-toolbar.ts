/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import L from 'leaflet'
import { type GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import { convertPolyLineToLatLngs, convertLatLngsToGeoPoints } from '@Pimcore/components/geo-map/utils/lat-lng-convert'

export const addGeoPolyLineToolbar = (leafletMap: L.Map, featureGroup: L.FeatureGroup, geoPolyLine?: GeoPoints, onChange?: (geoPolyLine: GeoPoints | undefined) => void, disabled?: boolean): void => {
  leafletMap.addLayer(featureGroup)

  const polyLine = geoPolyLine !== undefined ? L.polyline(convertPolyLineToLatLngs(geoPolyLine), { stroke: true, color: '#3388ff', opacity: 0.5, fillOpacity: 0.2, weight: 4 }) : undefined
  if (polyLine !== undefined) {
    featureGroup.addLayer(polyLine)
    leafletMap.fitBounds(polyLine.getBounds())
  }

  if (disabled === true) {
    return
  }

  const drawControlFull = new L.Control.Draw({
    position: 'topright',
    draw: {
      rectangle: false,
      polygon: false,
      circle: false,
      marker: false,
      circlemarker: false
    },
    edit: {
      featureGroup,
      remove: false
    }
  })
  leafletMap.addControl(drawControlFull)

  leafletMap.on(L.Draw.Event.CREATED, function (e) {
    featureGroup.clearLayers()
    if (polyLine !== undefined) {
      polyLine.remove()
    }

    const layer = e.layer as L.Polyline
    featureGroup.addLayer(layer)
    if (featureGroup.getLayers().length === 1) {
      if (onChange !== undefined) {
        onChange(convertLatLngsToGeoPoints(layer.getLatLngs() as L.LatLng[]))
      }
    }
  })

  leafletMap.on(L.Draw.Event.DELETED, function (e) {
    if (onChange !== undefined) {
      onChange(undefined)
    }
  })

  leafletMap.on(L.Draw.Event.EDITSTOP, function (e) {
    for (const layerId in e.target._layers) {
      if (Object.prototype.hasOwnProperty.call(e.target._layers, layerId) === true) {
        const layer = e.target._layers[layerId]
        if (Object.prototype.hasOwnProperty.call(layer, 'edited') === true) {
          if (onChange !== undefined) {
            onChange(convertLatLngsToGeoPoints(layer.editing.latlngs[0] as L.LatLng[]))
          }
        }
      }
    }
  })
}
