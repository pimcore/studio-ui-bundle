/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput, type ISearchInputProps } from '@Pimcore/components/search-input/search-input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import React, { useEffect, useState } from 'react'
import { SearchResult } from './search-result/search-result'
import { SearchTermProvider } from './provider/search-term-provider'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'

export const GeneralTab = (): React.JSX.Element => {
  const { searchTerm: sharedSearchTerm, setSearchTerm: setSharedSearchTerm } = useSearch()
  // Seeded from the shared term so a term typed on another tab is taken over here.
  const [searchTerm, setSearchTerm] = useState(sharedSearchTerm)
  const [searchQuery, setSearchQuery] = useState(sharedSearchTerm)

  useEffect(() => {
    const timerId = setTimeout(() => { setSearchTerm(searchQuery) }, 500)
    return () => { clearTimeout(timerId) }
  }, [searchQuery])

  // Take over a term typed on one of the typed tabs while this tab stays mounted.
  useEffect(() => {
    setSearchQuery(sharedSearchTerm)
  }, [sharedSearchTerm])

  const onSearch: ISearchInputProps['onSearch'] = (value) => {
    setSearchQuery(value)
    setSharedSearchTerm(value)
  }

  // Sharing on blur (instead of every keystroke) keeps the term available when switching tabs
  // without re-rendering the whole modal per character.
  const onBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setSharedSearchTerm(event.target.value)
  }

  return (
    <ContentLayout
      renderTopBar={
        <Toolbar
          padding={ { left: 'none', right: 'none' } }
          position='top'
          theme='secondary'
        >
          <SearchInput
            data-testid="search-modal-input"
            maxWidth={ '100%' }
            onBlur={ onBlur }
            onChange={ (event) => { setSearchQuery(event.target.value) } }
            onSearch={ onSearch }
            value={ searchQuery }
          />
        </Toolbar>
      }
    >
      <SearchTermProvider searchTerm={ searchTerm }>
        <SearchResult />
      </SearchTermProvider>
    </ContentLayout>
  )
}
