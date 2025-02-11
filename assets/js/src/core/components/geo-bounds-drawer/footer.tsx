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

import React, { useEffect } from 'react'
import { type GeoBounds, type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoMapCardFooter } from '@Pimcore/components/geo-map/components/geo-map-card-footer/geo-map-card-footer'

export interface GeoBoundsDrawerFooterProps {
  onChange?: (value?: GeoBounds) => void
  onSearch: (geoPoint: GeoPoint) => void
  value?: GeoBounds
}

export const GeoBoundsDrawerFooter = (props: GeoBoundsDrawerFooterProps): React.JSX.Element => {
  const [value, setValue] = React.useState<GeoBounds | undefined>(props.value)

  const emptyValue = (): void => {
    setValue(undefined)
    if (props.onChange !== undefined) {
      props.onChange(undefined)
    }
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <GeoMapCardFooter
      emptyValue={ emptyValue }
      onSearch={ props.onSearch }
      removeButtonDisabled={ value === undefined }
    />
  )
}
