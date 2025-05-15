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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { type GeoPoints, type GeoPoint } from '@Pimcore/components/geo-map/types/geo-types'

interface GeoPointListProps {
  geoPoints: GeoPoints
}

export const GeoPointList = ({ geoPoints }: GeoPointListProps): React.JSX.Element => {
  const items: string[] = geoPoints.map((geoPoint: GeoPoint) => {
    return geoPoints.length > 1 ? `[${geoPoint.latitude}, ${geoPoint.longitude}]` : `${geoPoint.latitude}, ${geoPoint.longitude}`
  })

  return (
    <GridCellPreviewWrapper>
      { items.join(' → ') }
    </GridCellPreviewWrapper>
  )
}
