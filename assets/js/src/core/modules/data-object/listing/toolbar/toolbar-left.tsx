/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Split } from '@Pimcore/components/split/split'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'
import { Space } from '@Pimcore/components/space/space'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { ClassDefinitionSelect } from '../decorator/class-definition-selection/components/class-definition-select/class-definition-select'
import { BatchActions } from '../batch-actions/batch-actions'

export const ToolbarLeft = (): React.JSX.Element => {
  const { selectedRows } = useRowSelection()

  const selectedRowsCount = Object.keys(selectedRows ?? {}).length

  return useMemo(() => (
    <Split>
      <Space size="extra-small">
        {selectedRowsCount > 0 && (
          <RowSelectionTotal />
        )}

        {selectedRowsCount <= 0 && (
          <ClassDefinitionSelect />
        )}
      </Space>

      <BatchActions />
    </Split>
  ), [selectedRowsCount])
}
