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
import { reverseGeocode } from '@Pimcore/components/geo-map/utils/geocode'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { convertLatLngToGeoPoint } from '@Pimcore/components/geo-map/utils/lat-lng-convert'

export const addGeoPointToolbar = (leafletMap: L.Map, featureGroup: L.FeatureGroup, reverseGeoCodeUrlTemplate: string, geoPoint?: GeoPoint, onChange?: (geoPoint: GeoPoint) => void, disabled?: boolean): void => {
  leafletMap.addLayer(featureGroup)

  const marker = geoPoint !== undefined ? L.marker([geoPoint.latitude, geoPoint.longitude]) : undefined
  if (marker !== undefined) {
    featureGroup.addLayer(marker)
  }

  if (disabled === true) {
    return
  }

  const drawControlFull = new L.Control.Draw({
    position: 'topright',
    draw: {
      polyline: false,
      polygon: false,
      circle: false,
      rectangle: false,
      circlemarker: false
    },
    edit: {
      featureGroup,
      remove: false
    }
  })
  leafletMap.addControl(drawControlFull)

  leafletMap.on(L.Draw.Event.CREATED, async function (e) {
    featureGroup.clearLayers()
    if (marker !== undefined) {
      marker.remove()
    }
    const layer = e.layer as L.Marker
    featureGroup.addLayer(layer)

    if (featureGroup.getLayers().length === 1) {
      await reverseGeocode(layer, reverseGeoCodeUrlTemplate).catch((error) => {
        console.error(error)
      })
      onChange?.(convertLatLngToGeoPoint(layer.getLatLng()))
    }
  })

  leafletMap.on(L.Draw.Event.EDITSTOP, async function (e) {
    for (const layerId in e.target._layers) {
      if (Object.prototype.hasOwnProperty.call(e.target._layers, layerId) === true) {
        const layer = e.target._layers[layerId]
        if (Object.prototype.hasOwnProperty.call(layer, 'edited') === true) {
          if (onChange !== undefined) {
            onChange(convertLatLngToGeoPoint(layer._latlng as L.LatLng))
          }
        }
      }
    }
  })
}
