/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { GeoBoundsDrawerFooter } from './footer'
import { GeoMapCard, type GeoMapCardBaseProps } from '@Pimcore/components/geo-map/components/geo-map-card/geo-map-card'
import { type GeoBounds, type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { type GeoMapAPI } from '@Pimcore/components/geo-map/geo-map'
import { isEqual } from 'lodash'

export interface GeoBoundsDrawerProps extends GeoMapCardBaseProps {
  onChange?: (value: GeoBounds | undefined) => void
  value?: GeoBounds | null
  disabled?: boolean
  className?: string
}

export const GeoBoundsDrawer = ({ ...props }: GeoBoundsDrawerProps): React.JSX.Element => {
  const [mapValue, setMapValue] = useState<GeoBounds | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null)

  const handleChangeFooter = (newValue?: GeoBounds): void => {
    setMapValue(newValue)
    props.onChange?.(newValue)

    const geoMapAPI = geoMapRef.current
    geoMapAPI?.reset()
    geoMapAPI?.forceRerender()
  }

  const handleChangeMap = (newValue: GeoBounds): void => {
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
      className={ props?.className }
      disabled={ props.disabled }
      footer={ props.disabled === true
        ? undefined
        : (
          <GeoBoundsDrawerFooter
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
      mapMode="geoBounds"
      mapValue={ mapValue }
      onChangeMap={ handleChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
