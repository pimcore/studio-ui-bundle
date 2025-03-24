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

import React, { useRef } from 'react'
import { GeoBoundsDrawerFooter } from './footer'
import { GeoMapCard, type GeoMapCardBaseProps } from '@Pimcore/components/geo-map/components/geo-map-card/geo-map-card'
import { type GeoBounds, type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { type GeoMapAPI } from '@Pimcore/components/geo-map/geo-map'

export interface GeoBoundsDrawerProps extends GeoMapCardBaseProps {
  onChange?: (value: GeoBounds | undefined) => void
  value?: GeoBounds | null
  disabled?: boolean
  className?: string
}

export const GeoBoundsDrawer = ({ ...props }: GeoBoundsDrawerProps): React.JSX.Element => {
  const [mapValue, setMapValue] = React.useState<GeoBounds | undefined>(props.value ?? undefined)
  const [footerValue, setFooterValue] = React.useState<GeoBounds | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null)

  const onChangeFooter = (newValue?: GeoBounds): void => {
    setFooterValue(newValue)
    setMapValue(newValue)
    props.onChange?.(newValue)
    const geoMapAPI = geoMapRef.current
    geoMapAPI?.reset()
    geoMapAPI?.forceRerender()
  }

  const onChangeMap = (newValue: GeoBounds): void => {
    setFooterValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <GeoMapCard
      className={ props?.className }
      disabled={ props.disabled }
      footer={ props.disabled === true
        ? undefined
        : (
          <GeoBoundsDrawerFooter
            onChange={ onChangeFooter }
            onSearch={ (geoPoint?: GeoPoint) => {
              setFooterValue(undefined)
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
            value={ footerValue }
          />
          ) }
      height={ props.height }
      lat={ props.lat }
      lng={ props.lng }
      mapMode="geoBounds"
      mapValue={ mapValue }
      onChangeMap={ onChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
