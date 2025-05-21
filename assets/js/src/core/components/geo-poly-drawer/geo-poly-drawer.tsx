/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { GeoPolyDrawerFooter } from './footer'
import { GeoMapCard, type GeoMapCardBaseProps } from '@Pimcore/components/geo-map/components/geo-map-card/geo-map-card'
import { type GeoPoint, type GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import { type GeoMapAPI } from '@Pimcore/components/geo-map/geo-map'
import { isEqual } from 'lodash'

export interface GeoPolyDrawerProps extends GeoMapCardBaseProps {
  onChange?: (value: GeoPoints | undefined) => void
  value?: GeoPoints | null
  mode: 'geoPolyLine' | 'geoPolygon'
  disabled?: boolean
  className?: string
}

export const GeoPolyDrawer = ({ ...props }: GeoPolyDrawerProps): React.JSX.Element => {
  const [mapValue, setMapValue] = React.useState<GeoPoints | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null)

  const handleChangeFooter = (newValue?: GeoPoints): void => {
    setMapValue(newValue)
    props.onChange?.(newValue)

    const geoMapAPI = geoMapRef.current
    geoMapAPI?.reset()
    geoMapAPI?.forceRerender()
  }

  const handleChangeMap = (newValue: GeoPoints): void => {
    setMapValue(newValue)
    props.onChange?.(newValue)
  }

  useEffect(() => {
    if (!isEqual(mapValue, props.value)) {
      setMapValue(props.value ?? undefined)
    }
  }, [props.value])

  return (
    <GeoMapCard
      className={ props.className }
      disabled={ props.disabled }
      footer={ props.disabled === true
        ? undefined
        : (
          <GeoPolyDrawerFooter
            onChange={ handleChangeFooter }
            onSearch={ (geoPoint?: GeoPoint) => {
              setMapValue(undefined)

              const geoMapAPI = geoMapRef.current
              geoMapAPI?.setValue(undefined)
              if (geoPoint === undefined) {
                geoMapAPI?.reset()
              } else {
                geoMapAPI?.setLat(geoPoint.latitude)
                geoMapAPI?.setLng(geoPoint.longitude)
                geoMapAPI?.setZoom(15)
              }
              geoMapAPI?.forceRerender()
              props.onChange?.(undefined)
            } }
            value={ mapValue }
          />
          ) }
      height={ props.height }
      lat={ props.lat }
      lng={ props.lng }
      mapMode={ props.mode }
      mapValue={ mapValue }
      onChangeMap={ handleChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
