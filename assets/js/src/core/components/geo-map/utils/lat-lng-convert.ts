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

import type { GeoPoint, GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import L from 'leaflet'

export const convertLatLngToGeoPoint = (latLng: L.LatLng): GeoPoint => {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng
  }
}
export const convertGeoPointToLatLng = (geoPoint: GeoPoint): L.LatLng => {
  return new L.LatLng(geoPoint.latitude, geoPoint.longitude)
}
export const convertPolyLineToLatLngs = (polyLine: GeoPoints): L.LatLng[] => {
  return polyLine.map(convertGeoPointToLatLng)
}
export const convertLatLngsToGeoPoints = (latlngs: L.LatLng[]): GeoPoint[] => {
  return latlngs.map(convertLatLngToGeoPoint)
}
