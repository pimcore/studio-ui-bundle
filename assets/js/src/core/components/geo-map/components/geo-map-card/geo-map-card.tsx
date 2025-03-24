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

import React, { forwardRef } from 'react'
import cn from 'classnames'
import { GeoMap, type GeoMapAPI, type GeoMapMode } from '@Pimcore/components/geo-map/geo-map'
import { Card } from '@Pimcore/components/card/card'
import { useStyles } from './geo-map-card.styles'
import { type GeoType } from '@Pimcore/components/geo-map/types/geo-types'

export interface GeoMapCardBaseProps {
  width?: string
  height?: string
  lat?: number
  lng?: number
  zoom?: number
}

export interface GeoMapCardProps extends GeoMapCardBaseProps {
  mapValue?: GeoType
  mapMode?: GeoMapMode
  onChangeMap?: (value: GeoType) => void
  footer?: React.ReactNode
  disabled?: boolean
  className?: string
}

const GeoMapCard = forwardRef<GeoMapAPI, GeoMapCardProps>((props, geoMapRef): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Card
      className={ cn(styles.container, props?.className) }
      cover={
        <GeoMap
          disabled={ props.disabled }
          height={ props.height }
          lat={ props.lat }
          lng={ props.lng }
          mode={ props.mapMode }
          onChange={ props.onChangeMap }
          ref={ geoMapRef }
          value={ props.mapValue }
          width={ props.width }
          zoom={ props.zoom }
        />
            }
      fitContent
      footer={ props.footer }
      style={ { width: props.width } }
    />
  )
})

GeoMapCard.displayName = 'GeoMapCard'

export { GeoMapCard }
