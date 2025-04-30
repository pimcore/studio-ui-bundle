/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
