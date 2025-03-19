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
