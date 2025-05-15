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
import { formatNumber } from '@Pimcore/utils/number'
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isNull, isNumber } from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'

interface QuantityValueProps {
  value: number | string | null
  unitId: string | null
}

export const QuantityValue = ({ value, unitId }: QuantityValueProps): React.JSX.Element => {
  const { getAbbreviation } = useQuantityValueUnits()

  return (
    <GridCellPreviewWrapper>
      { isNumber(value) ? formatNumber({ value }) : value} { !isNull(unitId) && getAbbreviation(unitId) }
    </GridCellPreviewWrapper>
  )
}
