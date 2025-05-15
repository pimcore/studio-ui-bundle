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

interface NumericProps {
  value: number
}

export const Numeric = ({ value }: NumericProps): React.JSX.Element => {
  return (
    <GridCellPreviewWrapper>
      {formatNumber({ value })}
    </GridCellPreviewWrapper>
  )
}
