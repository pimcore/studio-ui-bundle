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
import { formatNumber } from '@Pimcore/utils/number'
import { isEmpty, isString } from 'lodash'

interface NumericRangeProps {
  min?: number | string
  max?: number | string
}

export const NumericRange = ({ min, max }: NumericRangeProps): React.JSX.Element => {
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
      { value.join(' - ') }
    </GridCellPreviewWrapper>
  )
}
