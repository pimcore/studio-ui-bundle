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

import React from 'react'
import { formatNumber } from '@Pimcore/utils/number'
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isEmpty, isNull, isString } from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'

interface QuantityValueRangeProps {
  min?: number | string
  max?: number | string
  unitId: string | null
}

export const QuantityValueRange = ({ min, max, unitId }: QuantityValueRangeProps): React.JSX.Element => {
  const { getAbbreviation } = useQuantityValueUnits()

  const minimum = isString(min) ? min : formatNumber({ value: min })
  const maximum = isString(max) ? max : formatNumber({ value: max })

  const value: string[] = []
  if (!isEmpty(minimum)) {
    value.push(minimum)
  }
  if (!isEmpty(maximum)) {
    value.push(maximum)
  }

  return (
    <GridCellPreviewWrapper>
      { value.join(' - ') } { !isNull(unitId) && getAbbreviation(unitId) }
    </GridCellPreviewWrapper>
  )
}
