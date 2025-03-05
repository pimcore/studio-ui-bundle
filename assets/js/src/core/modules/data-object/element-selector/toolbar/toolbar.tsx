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

import React from 'react'
import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { RowSelectionTotal } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total'
import { Split } from '@Pimcore/components/split/split'
import { Refetch } from '@Pimcore/modules/element/listing/abstract/view-layer/components/refetch/refetch'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import { Flex } from '@Pimcore/components/flex/flex'
import { ApplyButton } from '@Pimcore/modules/element/element-selector/components/apply-button/apply-button'

export const Toolbar = (): React.JSX.Element => {
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
          <RowSelectionTotal />
          <Refetch />
          <Pagination />
        </Split>

        <ApplyButton />
      </Flex>
    </BaseToolbar>
  )
}
