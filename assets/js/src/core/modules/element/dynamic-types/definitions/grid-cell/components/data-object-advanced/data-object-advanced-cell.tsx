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
import { PreviewValue } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/forms/advanced-column-form/preview/preview-value'

export const DataObjectAdvancedCell = (props: DefaultCellProps): React.JSX.Element => {
  const { getValue } = props
  const value = getValue()

  return (
    <div className={ ['default-cell__content'].join(' ') }>
      { value === undefined || value.length === 0
        ? (
          <span>No data available</span>
          )
        : (
          <PreviewValue value={ value } />
          )}
    </div>
  )
}
