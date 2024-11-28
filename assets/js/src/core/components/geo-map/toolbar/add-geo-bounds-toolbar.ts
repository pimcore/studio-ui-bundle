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
import { type GeoBounds } from '@Pimcore/components/geo-map/types/geo-types'

export const addGeoBoundsToolbar = (leafletMap: L.Map, featureGroup: L.FeatureGroup, geoBounds?: GeoBounds, onChange?: (geoBounds: GeoBounds | undefined) => void, disabled?: boolean): void => {
  leafletMap.addLayer(featureGroup)

  const bounds = geoBounds !== undefined ? L.latLngBounds(L.latLng(geoBounds.northEast.latitude, geoBounds.northEast.longitude), L.latLng(geoBounds.southWest.latitude, geoBounds.southWest.longitude)) : undefined
  let rectangle: L.Rectangle | undefined

  if (bounds !== undefined) {
    rectangle = L.rectangle(bounds, { stroke: true, color: '#3388ff', opacity: 0.5, fillOpacity: 0.2, weight: 4 })
    featureGroup.addLayer(rectangle)
    leafletMap.fitBounds(bounds)
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
      marker: false,
      circlemarker: false,
      // eslint-disable-next-line
      rectangle: { showArea: false } as any
    },
    edit: {
      featureGroup,
      remove: false
    }
  })
  leafletMap.addControl(drawControlFull)

  leafletMap.on(L.Draw.Event.CREATED, function (e) {
    featureGroup.clearLayers()
    if (rectangle !== undefined) {
      rectangle.remove()
    }

    const layer = e.layer as L.Rectangle
    featureGroup.addLayer(layer)
    if (featureGroup.getLayers().length === 1) {
      if (onChange !== undefined) {
        const ne = layer.getBounds().getNorthEast()
        const sw = layer.getBounds().getSouthWest()
        onChange({
          northEast: {
            latitude: ne.lat,
            longitude: ne.lng
          },
          southWest: {
            latitude: sw.lat,
            longitude: sw.lng
          }
        })
      }
    }
  })

  leafletMap.on(L.Draw.Event.DELETED, function (e) {
    if (onChange !== undefined) {
      onChange(undefined)
    }
  })

  leafletMap.on(L.Draw.Event.EDITRESIZE + ' ' + L.Draw.Event.EDITMOVE, function (e) {
    if (onChange !== undefined) {
      const ne = e.layer.getBounds().getNorthEast()
      const sw = e.layer.getBounds().getSouthWest()

      onChange({
        northEast: {
          latitude: ne.lat,
          longitude: ne.lng
        },
        southWest: {
          latitude: sw.lat,
          longitude: sw.lng
        }
      })
    }
  })
}
