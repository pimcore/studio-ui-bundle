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

import React, {useRef} from 'react'
import { GeoPolyDrawerFooter } from './footer'
import {GeoMapCard, GeoMapCardBaseProps} from "@Pimcore/components/geo-map/components/geo-map-card/geo-map-card";
import {GeoPoint, GeoPoints} from "@Pimcore/components/geo-map/types/geo-types";
import {GeoMapAPI} from "@Pimcore/components/geo-map/geo-map";

export interface GeoPolyDrawerProps extends GeoMapCardBaseProps{
  onChange?: (value: GeoPoints | undefined) => void
  value?: GeoPoints | null
  mode: 'geoPolyLine' | 'geoPolygon'
}

export const GeoPolyDrawer = ({ ...props }: GeoPolyDrawerProps): React.JSX.Element => {
  const [mapValue, setMapValue] = React.useState<GeoPoints | undefined>(props.value ?? undefined)
  const [footerValue, setFooterValue] = React.useState<GeoPoints | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null);

  const onChangeFooter = (newValue?: GeoPoints): void => {
    setFooterValue(newValue)
    setMapValue(newValue)
    props.onChange?.(newValue)
    const geoMapAPI = geoMapRef.current;
    geoMapAPI?.reset()
    geoMapAPI?.forceRerender()
  }

  const onChangeMap = (newValue: GeoPoints): void => {
    setFooterValue(newValue)
    props.onChange?.(newValue)
  }

  return (
      <GeoMapCard
        ref={geoMapRef}
        mapMode={ props.mode }
        mapValue={ mapValue }
        width={ props.width }
        height={ props.height }
        lat={ props.lat }
        lng={ props.lng }
        zoom={ props.zoom }
        onChangeMap={ onChangeMap }
        footer={<GeoPolyDrawerFooter
            onChange={ onChangeFooter }
            onSearch={ (geoPoint?: GeoPoint) => {
              setFooterValue(undefined)
              setMapValue(undefined)

              const geoMapAPI = geoMapRef.current;
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
        />}
      />
  )
}
