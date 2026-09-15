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
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { translateLabel } from '@Pimcore/utils/translate-label'

export interface TextCellProps extends DefaultCellProps {}

export const TranslateCell = (props: TextCellProps): React.JSX.Element => {
  const value = props.getValue()

  return (
    <div className="default-cell__content default-cell__content--padded">
      { translateLabel(value) }
    </div>
  )
}
