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

import L from 'leaflet'
import { type GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import { convertPolyLineToLatLngs, convertLatLngsToGeoPoints } from '@Pimcore/components/geo-map/utils/lat-lng-convert'

export const addGeoPolygonToolbar = (leafletMap: L.Map, featureGroup: L.FeatureGroup, geoPolygon?: GeoPoints, onChange?: (geoPolyLine: GeoPoints | undefined) => void, disabled?: boolean): void => {
  leafletMap.addLayer(featureGroup)

  const polygon = geoPolygon !== undefined ? L.polygon(convertPolyLineToLatLngs(geoPolygon), { stroke: true, color: '#3388ff', opacity: 0.5, fillOpacity: 0.2, weight: 4 }) : undefined
  if (polygon !== undefined) {
    featureGroup.addLayer(polygon)
    leafletMap.fitBounds(polygon.getBounds())
  }

  if (disabled === true) {
    return
  }

  const drawControlFull = new L.Control.Draw({
    position: 'topright',
    draw: {
      circle: false,
      marker: false,
      circlemarker: false,
      rectangle: false,
      polyline: false
    },
    edit: {
      featureGroup,
      remove: false
    }
  })
  leafletMap.addControl(drawControlFull)

  leafletMap.on(L.Draw.Event.CREATED, function (e) {
    featureGroup.clearLayers()
    if (polygon !== undefined) {
      polygon.remove()
    }

    const layer = e.layer as L.Polygon
    featureGroup.addLayer(layer)
    if (featureGroup.getLayers().length === 1) {
      if (onChange !== undefined) {
        onChange(convertLatLngsToGeoPoints(layer.getLatLngs()[0] as L.LatLng[]))
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
            onChange(convertLatLngsToGeoPoints(layer.editing.latlngs[0][0] as L.LatLng[]))
          }
        }
      }
    }
  })
}
