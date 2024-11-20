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

import React, { useState } from 'react'
import { GeoMap } from '@Pimcore/components/geo-map/geo-map'
import { type GeoPoint } from '@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar'
import { Card } from '@Pimcore/components/card/card'
import { GeoPointPickerFooter } from '@Pimcore/components/geo-point-picker/footer'
import { useStyles } from './geo-point-picker.styles'
import cn from 'classnames'

export interface GeoPointPickerProps {
  onChange?: (value: GeoPoint) => void
  value?: GeoPoint | null
  width?: string
  height?: string
  lat?: number
  lng?: number
  zoom?: number
}

export const GeoPointPicker = ({ ...props }: GeoPointPickerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [footerValue, setFooterValue] = React.useState<GeoPoint | undefined>(props.value ?? undefined)
  const [mapValue, setMapValue] = React.useState<GeoPoint | undefined>(props.value ?? undefined)
  const [mapKey, setMapKey] = useState<number>(0)

  const forceMapRerender = (): void => {
    setMapKey(prevKey => prevKey + 1)
  }

  const onChangeFooter = (newValue: GeoPoint): void => {
    setFooterValue(newValue)
    setMapValue(newValue)
    if (props.onChange !== undefined) {
      props.onChange(newValue)
    }
    forceMapRerender()
  }

  const onChangeMap = (newValue: GeoPoint): void => {
    setFooterValue(newValue)
    if (props.onChange !== undefined) {
      props.onChange(newValue)
    }
  }

  return (
    <Card
      className={ cn(styles.container) }
      cover={ <GeoMap
        height={ props.height }
        key={ mapKey }
        lat={ props.lat }
        lng={ props.lng }
        mode="geoPoint"
        onChange={ onChangeMap }
        value={ mapValue }
        width={ '100%' }
        zoom={ props.zoom }
              /> }
      fitContent
      footer={ <GeoPointPickerFooter
        onChange={ onChangeFooter }
        value={ footerValue }
               /> }
      style={ { width: props.width } }
    >
    </Card>
  )
}
