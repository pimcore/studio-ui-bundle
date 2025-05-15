/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useSearchTermFilter } from '../../../context-layer/provider/search-term-filter/use-search-term-filter'
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { useFilterOptional } from '../sidebar/tabs/filters/provider/filter-provider/use-filter-optional'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

export const SearchTermFilter = (): React.JSX.Element => {
  const { searchTerm, setSearchTerm } = useSearchTermFilter()
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(searchTerm)
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const filterContext = useFilterOptional()

  useEffect(() => {
    setCurrentSearchTerm(searchTerm)
  }, [searchTerm])

  function onSearch (): void {
    if (!handleSearchTermInSidebar) {
      setSearchTerm(currentSearchTerm)
    } else {
      filterContext?.setSearchTerm(currentSearchTerm)
    }
  }

  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setCurrentSearchTerm(event.target.value)

    if (handleSearchTermInSidebar) {
      filterContext?.setSearchTerm(event.target.value)
    }
  }

  return (
    <SearchInput
      className='w-full'
      maxWidth={ '100%' }
      onChange={ onChange }
      onSearch={ onSearch }
      placeholder='Search'
      value={ currentSearchTerm }
    />
  )
}
