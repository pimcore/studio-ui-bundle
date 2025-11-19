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
import { Split } from '@Pimcore/components/split/split'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'
import { BatchActions } from '../batch-actions/batch-actions'

export const ToolbarLeft = (): React.JSX.Element => {
  return (
    <Split size="mini">
      <RowSelectionTotal />
      <BatchActions />
    </Split>
  )
}
