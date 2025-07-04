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
import { isEqual } from 'lodash'
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
  const [mapValue, setMapValue] = useState<GeoPoint | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null)

  const handleChangeFooter = (newValue: GeoPoint): void => {
    setMapValue(newValue)
    props.onChange?.(newValue)

    const geoMapAPI = geoMapRef.current
    geoMapAPI?.forceRerender()
  }

  const handleChangeMap = (newValue: GeoPoint): void => {
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
      footer={ <GeoPointPickerFooter
        disabled={ props.disabled }
        onChange={ handleChangeFooter }
        value={ mapValue }
               /> }
      height={ props.height }
      lat={ props.lat }
      lng={ props.lng }
      mapMode={ 'geoPoint' }
      mapValue={ mapValue }
      onChangeMap={ handleChangeMap }
      ref={ geoMapRef }
      width={ props.width }
      zoom={ props.zoom }
    />
  )
}
