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
import { type GeoMapAPI } from '@Pimcore/components/geo-map/geo-map'
import { GeoPointPickerFooter } from '@Pimcore/components/geo-point-picker/footer'
import { type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoMapCard } from '@Pimcore/components/geo-map/components/geo-map-card/geo-map-card'

export interface GeoPointPickerProps {
  onChange?: (value: GeoPoint) => void
  value?: GeoPoint | null
  width?: string
  height?: string
  lat?: number
  lng?: number
  zoom?: number
  disabled?: boolean
  className?: string
}

export const GeoPointPicker = ({ ...props }: GeoPointPickerProps): React.JSX.Element => {
  const [footerValue, setFooterValue] = React.useState<GeoPoint | undefined>(props.value ?? undefined)
  const [mapValue, setMapValue] = React.useState<GeoPoint | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null)

  const onChangeFooter = (newValue: GeoPoint): void => {
    setFooterValue(newValue)
    setMapValue(newValue)
    props.onChange?.(newValue)
    const geoMapAPI = geoMapRef.current
    geoMapAPI?.forceRerender()
  }

  const onChangeMap = (newValue: GeoPoint): void => {
    setFooterValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <GeoMapCard
      className={ props?.className }
      disabled={ props.disabled }
      footer={ <GeoPointPickerFooter
        disabled={ props.disabled }
        onChange={ onChangeFooter }
        value={ footerValue }
               /> }
      height={ props.height }
      lat={ props.lat }
      lng={ props.lng }
      mapMode={ 'geoPoint' }
      mapValue={ mapValue }
      onChangeMap={ onChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
