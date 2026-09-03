/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Header } from '@Pimcore/components/header/header'
import { Title } from '@Pimcore/components/title/title'
import { ProvidedTypeSelect } from '@Pimcore/modules/element/components/type-select/provided-type-select'
import { SearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import React from 'react'

export const TopBar = (): React.JSX.Element => {
  const { isOpen, setSearchTerm, loadedSavedSearch } = useSearch()
  const isSavedSearchWidget = loadedSavedSearch !== undefined

  const search = <SearchTermFilter onCommit={ isOpen ? setSearchTerm : undefined } />

  if (isSavedSearchWidget) {
    return (
      <Header>
        <Flex
          align="center"
          gap='extra-small'
        >
          <Title>{loadedSavedSearch.name}</Title>
          <ProvidedTypeSelect />
        </Flex>
        <div style={ { width: 320, flexShrink: 0 } }>
          {search}
        </div>
      </Header>
    )
  }

  return (
    <Toolbar
      padding={ { left: 'none', right: 'none' } }
      position='none'
      theme='secondary'
    >
      <Flex
        className='w-full'
        gap={ 'extra-small' }
      >
        <ProvidedTypeSelect />
        {search}
      </Flex>
    </Toolbar>
  )
}
