/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { GeoBounds, GeoPoint, GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import L from 'leaflet'

export const convertLatLngToGeoPoint = (latLng: L.LatLng): GeoPoint => {
  // Normalize longitude to -180 to 180 range
  let normalizedLongitude = latLng.lng
  while (normalizedLongitude > 180) {
    normalizedLongitude -= 360
  }
  while (normalizedLongitude < -180) {
    normalizedLongitude += 360
  }

  // Normalize latitude to -90 to 90 range (clamp)
  const normalizedLatitude = Math.max(-90, Math.min(90, latLng.lat))

  return {
    latitude: normalizedLatitude,
    longitude: normalizedLongitude
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
export const convertLatLngBoundsToGeoBounds = (bounds: L.LatLngBounds): GeoBounds => {
  return {
    northEast: convertLatLngToGeoPoint(bounds.getNorthEast()),
    southWest: convertLatLngToGeoPoint(bounds.getSouthWest())
  }
}
