/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
  const geoValue = props.value ?? undefined
  const geoMapRef = useRef<GeoMapAPI>(null)

  const handleChangeFooter = (newValue: GeoPoint): void => {
    props.onChange?.(newValue)

    const geoMapAPI = geoMapRef.current
    geoMapAPI?.forceRerender()
  }

  const handleChangeMap = (newValue: GeoPoint): void => {
    props.onChange?.(newValue)
  }

  return (
    <GeoMapCard
      className={ props?.className }
      disabled={ props.disabled }
      footer={ (
        <GeoPointPickerFooter
          disabled={ props.disabled }
          onChange={ handleChangeFooter }
          value={ geoValue }
        />)
     }
      height={ props.height }
      lat={ props.lat }
      lng={ props.lng }
      mapMode={ 'geoPoint' }
      mapValue={ geoValue }
      onChangeMap={ handleChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
