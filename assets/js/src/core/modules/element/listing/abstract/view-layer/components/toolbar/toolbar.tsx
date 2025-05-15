/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import React, { useMemo } from 'react'
import { Refetch } from '../refetch/refetch'
import { Split } from '@Pimcore/components/split/split'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'

export const Toolbar = (): React.JSX.Element => {
  return useMemo(() => (
    <BaseToolbar theme='secondary'>
      <RowSelectionTotal />

      <Split size='extra-small'>
        <Refetch />
        <Pagination />
      </Split>
    </BaseToolbar>
  ), [])
}
