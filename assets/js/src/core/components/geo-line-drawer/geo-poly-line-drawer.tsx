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
import { GeoPolyLineDrawerFooter } from './footer'
import {GeoMapCard, GeoMapCardBaseProps} from "@Pimcore/components/geo-map/components/geo-map-card/geo-map-card";
import {GeoPoint, GeoPolyLine} from "@Pimcore/components/geo-map/types/geo-types";
import {GeoMapAPI} from "@Pimcore/components/geo-map/geo-map";

export interface GeoPolyLineDrawerProps extends GeoMapCardBaseProps{
  onChange?: (value: GeoPolyLine | undefined) => void
  value?: GeoPolyLine | null
}

export const GeoPolyLineDrawer = ({ ...props }: GeoPolyLineDrawerProps): React.JSX.Element => {
  const [mapValue, setMapValue] = React.useState<GeoPolyLine | undefined>(props.value ?? undefined)
  const [footerValue, setFooterValue] = React.useState<GeoPolyLine | undefined>(props.value ?? undefined)
  const geoMapRef = useRef<GeoMapAPI>(null);

  const onChangeFooter = (newValue?: GeoPolyLine): void => {
    setFooterValue(newValue)
    setMapValue(newValue)
    props.onChange?.(newValue)
    const geoMapAPI = geoMapRef.current;
    geoMapAPI?.reset()
    geoMapAPI?.forceRerender()
  }

  const onChangeMap = (newValue: GeoPolyLine): void => {
    setFooterValue(newValue)
    props.onChange?.(newValue)
  }

  return (
      <GeoMapCard
        ref={geoMapRef}
        mapMode={ 'geoPolyLine' }
        mapValue={ mapValue }
        width={ props.width }
        height={ props.height }
        lat={ props.lat }
        lng={ props.lng }
        zoom={ props.zoom }
        onChangeMap={ onChangeMap }
        footer={<GeoPolyLineDrawerFooter
            onChange={ onChangeFooter }
            onSearch={ (geoPoint: GeoPoint) => {
              setFooterValue(undefined)
              setMapValue(undefined)

              const geoMapAPI = geoMapRef.current;
              geoMapAPI?.setValue(undefined)
              geoMapAPI?.setLat(geoPoint.lat)
              geoMapAPI?.setLng(geoPoint.lng)
              geoMapAPI?.setZoom(15)
              geoMapAPI?.forceRerender()
              props.onChange?.(undefined)
            } }
            value={ footerValue }
        />}
      />
  )
}
