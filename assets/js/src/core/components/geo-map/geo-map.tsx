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

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import { addGeoPointToolbar } from '@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar'
import cn from 'classnames'
import { useStyles } from './geo-map.styles'
import { toCssDimension } from '@Pimcore/utils/css'
import { type GeoPoints, type GeoPoint, type GeoType, type GeoBounds } from '@Pimcore/components/geo-map/types/geo-types'
import { addGeoPolyLineToolbar } from '@Pimcore/components/geo-map/toolbar/add-geo-poly-line-toolbar'
import { addGeoPolygonToolbar } from '@Pimcore/components/geo-map/toolbar/add-geo-polygon-toolbar'
import { addGeoBoundsToolbar } from '@Pimcore/components/geo-map/toolbar/add-geo-bounds-toolbar'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon-2x.png',
  iconUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon.png',
  shadowUrl: '/bundles/pimcorestudioui/img/leaflet/marker-shadow.png'
})

export type GeoMapMode = 'geoPoint' | 'geoPolyLine' | 'geoPolygon' | 'geoBounds'

interface GeoMapProps {
  onChange?: (value?: GeoType) => void
  mode?: GeoMapMode
  value?: GeoType
  width?: string
  height?: string
  lat?: number
  lng?: number
  zoom?: number
  disabled?: boolean
}

export interface GeoMapAPI {
  forceRerender: () => void
  reset: () => void
  setLat: (lat: number) => void
  setLng: (lng: number) => void
  setZoom: (zoom: number) => void
  setValue: (value?: GeoType) => void
}

const GeoMap = forwardRef<GeoMapAPI, GeoMapProps>((props, ref): React.JSX.Element => {
  const { styles } = useStyles()
  const mapContainer = useRef<HTMLDivElement>(null)
  const [lat, setLat] = useState<number | undefined>(props.lat)
  const [lng, setLng] = useState<number | undefined>(props.lng)
  const [zoom, setZoom] = useState<number | undefined>(props.zoom)
  const [value, setValue] = useState<GeoType | undefined>(props.value)
  const [key, setKey] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const settings = useSettings()

  const geoMapApi: GeoMapAPI = {
    reset: () => {
      setLat(undefined)
      setLng(undefined)
      setZoom(undefined)
      setValue(undefined)
    },
    forceRerender: () => {
      setKey(prevKey => prevKey + 1)
    },
    setLat,
    setLng,
    setZoom,
    setValue
  }

  useImperativeHandle(ref, () => geoMapApi)

  const initializeMap = (): L.Map | null => {
    if (mapContainer.current !== null) {
      const map = L.map(mapContainer.current)
      if (props.mode === 'geoPoint' && props.value !== undefined) {
        const propsValue = props.value as GeoPoint
        map.setView([propsValue.latitude, propsValue.longitude], 15)
      } else if (lat !== props.lat && lng !== props.lng) {
        map.setView([lat ?? 0, lng ?? 0], 15)
      } else {
        map.setView([props.lat ?? 0, props.lng ?? 0], props.zoom ?? 1)
      }
      L.tileLayer(settings.maps.tile_layer_url_template as string, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      const featureGroup = L.featureGroup().addTo(map)

      if (props.mode === 'geoPoint') {
        addGeoPointToolbar(map, featureGroup, settings.maps.reverse_geocoding_url_template as string, value as GeoPoint, props.onChange, props.disabled)
      } else if (props.mode === 'geoPolyLine') {
        addGeoPolyLineToolbar(map, featureGroup, value as GeoPoints, props.onChange, props.disabled)
      } else if (props.mode === 'geoPolygon') {
        addGeoPolygonToolbar(map, featureGroup, value as GeoPoints, props.onChange, props.disabled)
      } else if (props.mode === 'geoBounds') {
        addGeoBoundsToolbar(map, featureGroup, value as GeoBounds, props.onChange, props.disabled)
      }

      return map
    }
    return null
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    setLat(props.lat)
  }, [props.lat])

  useEffect(() => {
    setLng(props.lng)
  }, [props.lng])

  useEffect(() => {
    setZoom(props.zoom)
  }, [props.zoom])

  const isVisible = useElementVisible(containerRef)

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const map = initializeMap()
    return () => {
      if (map !== null) {
        map.remove()
      }
    }
  }, [key, isVisible, lat, lng, zoom, value, props.mode, props.disabled])

  return (
    <div ref={ containerRef }>
      <div
        className={ cn(styles.mapContainer) }
        ref={ mapContainer }
        style={ { height: toCssDimension(props.height, 250), width: toCssDimension(props.width, 500) } }
      />
    </div>
  )
})

GeoMap.displayName = 'GeoMap'

export { GeoMap }
