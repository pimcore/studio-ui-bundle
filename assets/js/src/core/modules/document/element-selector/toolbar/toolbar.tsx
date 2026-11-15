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
import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'
import { Split } from '@Pimcore/components/split/split'
import { Refetch } from '@Pimcore/modules/element/listing/abstract/view-layer/components/refetch/refetch'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import { Flex } from '@Pimcore/components/flex/flex'
import { ApplyButton } from '@Pimcore/modules/element/element-selector/components/apply-button/apply-button'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

export const Toolbar = (): React.JSX.Element => {
  const { config } = useElementSelectorHelper()

  return (
    <BaseToolbar
      borderStyle='default'
      padding={ { right: 'none', left: 'none' } }
      theme='secondary'
    >
      <Flex
        className='w-full'
        gap={ 'small' }
        justify='space-between'
      >
        <Split size='extra-small'>
          { config.selectionType === SelectionType.Multiple && <RowSelectionTotal /> }
          <Refetch />
          <Pagination />
        </Split>

        <ApplyButton />
      </Flex>
    </BaseToolbar>
  )
}
