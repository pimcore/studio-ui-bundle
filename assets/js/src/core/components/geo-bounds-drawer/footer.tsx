/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type GeoBounds, type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'
import { GeoMapCardFooter } from '@Pimcore/components/geo-map/components/geo-map-card-footer/geo-map-card-footer'

export interface GeoBoundsDrawerFooterProps {
  onChange?: (value?: GeoBounds) => void
  onSearch: (geoPoint: GeoPoint) => void
  value?: GeoBounds
}

export const GeoBoundsDrawerFooter = (props: GeoBoundsDrawerFooterProps): React.JSX.Element => {
  const resetValue = (): void => {
    if (props.onChange !== undefined) {
      props.onChange(undefined)
    }
  }

  return (
    <GeoMapCardFooter
      emptyValue={ resetValue }
      onSearch={ props.onSearch }
      removeButtonDisabled={ props?.value === undefined }
    />
  )
}
