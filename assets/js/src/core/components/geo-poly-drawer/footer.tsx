/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { type GeoPoint, type GeoPoints } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoMapCardFooter } from '@Pimcore/components/geo-map/components/geo-map-card-footer/geo-map-card-footer'

export interface GeoPolyDrawerFooterProps {
  onChange?: (value?: GeoPoints) => void
  onSearch: (geoPoint: GeoPoint) => void
  value?: GeoPoints
}

export const GeoPolyDrawerFooter = (props: GeoPolyDrawerFooterProps): React.JSX.Element => {
  const [value, setValue] = React.useState<GeoPoints | undefined>(props.value)

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
