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

import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import React, { useMemo } from 'react'
import { Split } from '@Pimcore/components/split/split'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'
import { Refetch } from '@Pimcore/modules/element/listing/abstract/view-layer/components/refetch/refetch'
import { BatchActions } from '../batch-actions/batch-actions'

export const Toolbar = (): React.JSX.Element => {
  return useMemo(() => (
    <BaseToolbar theme='secondary'>
      <Split size="mini">
        <RowSelectionTotal />
        <BatchActions />
      </Split>

      <Split size='extra-small'>
        <Refetch />
        <Pagination />
      </Split>
    </BaseToolbar>
  ), [])
}
