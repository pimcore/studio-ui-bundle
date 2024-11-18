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

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import { addGeoPointToolbar, type GeoPoint } from '@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar'
import cn from 'classnames'
import { useStyles } from './geo-map.styles'
import { toCssDimension } from '@Pimcore/utils/css'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon-2x.png',
  iconUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon.png',
  shadowUrl: '/bundles/pimcorestudioui/img/leaflet/marker-shadow.png'
})

interface GeoMapProps {
  onChange?: (value: GeoPoint) => void
  mode?: 'geoPoint' | 'geoLine' | 'geoPolygon'
  value?: GeoPoint
  width?: string
  height?: string
  lat?: number
  lng?: number
  zoom?: number
}

export const GeoMap = (props: GeoMapProps): React.JSX.Element => {
  const { styles } = useStyles()
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const map = L.map(mapContainer.current as HTMLElement)
    if (props.mode === 'geoPoint' && props.value !== undefined) {
      map.setView([props.value.lat, props.value.lng], 15)
    } else {
      map.setView([props.lat ?? 0, props.lng ?? 0], props.zoom ?? 1)
    }

    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const featureGroup = L.featureGroup().addTo(map)

    if (props.mode === 'geoPoint') {
      addGeoPointToolbar(map, featureGroup, props.value, props.onChange)
    }

    return () => {
      map.remove()
    }
  }, [mapContainer, props.mode, props.value, props.lat, props.lng, props.zoom])

  return (
    <div
      className={ cn(styles.mapContainer) }
      ref={ mapContainer }
      style={ { height: toCssDimension(props.height, 250), width: toCssDimension(props.width, 500) } }
    />
  )
}
