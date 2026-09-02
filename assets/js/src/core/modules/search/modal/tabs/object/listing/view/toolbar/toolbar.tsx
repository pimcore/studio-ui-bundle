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
import { LanguageSelectionWithProvider } from '@Pimcore/components/language-selection/language-selection-with-provider'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'

export const Toolbar = (): React.JSX.Element => {
  const { loadedSavedSearch } = useSearch()
  const isSavedSearchWidget = loadedSavedSearch !== undefined

  return (
    <BaseToolbar
      theme='secondary'
    >
      <Flex
        className='w-full'
        gap={ 'small' }
        justify='space-between'
      >
        <Split size='extra-small'>
          <RowSelectionTotal />
          {isSavedSearchWidget && <LanguageSelectionWithProvider />}
        </Split>

        <Split size='extra-small'>
          <Refetch />
          <Pagination />
          {!isSavedSearchWidget && <LanguageSelectionWithProvider />}
        </Split>
      </Flex>
    </BaseToolbar>
  )
}
