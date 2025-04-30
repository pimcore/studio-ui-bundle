/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type L from 'leaflet'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'

export const ERROR_ADDRESS_NOT_FOUND = 'address_not_found'

export const geoCode = async (address: string, geoCodeUrlTemplate: string): Promise<GeoPoint> => {
  const geoCodeUrl = geoCodeUrlTemplate.replace('{q}', encodeURIComponent(address))

  const response = await fetch(geoCodeUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch reverse geocoding data: ${response.statusText}`)
  }
  const data = await response.json()

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(ERROR_ADDRESS_NOT_FOUND)
  }

  return {
    latitude: parseFloat(data[0].lat as string),
    longitude: parseFloat(data[0].lon as string)
  }
}

export const reverseGeocode = async (layerObj: L.Marker, reverseGeoCodeUrlTemplate: string): Promise<void> => {
  const reverseGeocodeUrl = reverseGeoCodeUrlTemplate
    .replace('{lat}', layerObj.getLatLng().lat.toString())
    .replace('{lon}', layerObj.getLatLng().lng.toString())

  await fetch(reverseGeocodeUrl).then(async (response: Response | undefined | null) => {
    if (response === undefined || response === null) {
      throw new Error('Failed to fetch reverse geocoding data.')
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch reverse geocoding data: ${response.statusText}`)
    }
    const data = await response.json()
    if (typeof data.display_name === 'string') {
      const locationText: string = data.display_name
      layerObj.bindTooltip(locationText)
      layerObj.openTooltip()
    }
  })
}
