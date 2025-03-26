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

import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput, type ISearchInputProps } from '@Pimcore/components/search-input/search-input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import React, { useEffect, useState } from 'react'
import { SearchResult } from './search-result/search-result'
import { SearchTermProvider } from './provider/search-term-provider'

export const GeneralTab = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => { setSearchTerm(searchQuery) }, 500)
    return () => { clearTimeout(timerId) }
  }, [searchQuery])

  const onSearch: ISearchInputProps['onSearch'] = (value) => {
    setSearchQuery(value)
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
            maxWidth={ '100%' }
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
