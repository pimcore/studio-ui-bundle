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

export const DataObjectAdvancedCell = (props: DefaultCellProps): React.JSX.Element => {
  const { getValue } = props;
  const value = getValue();

  const firstTest = value?.[0]?.value

  return (
    <div className={ ['default-cell__content'].join(' ') }>
      {firstTest}
    </div>
  )
}
