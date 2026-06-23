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
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
// Import specific host modules (not the host barrel) to avoid a host↔view import
// cycle: the search-term descriptor renders this component.
import { useAppliedFilters, useDraftFiltersOptional } from '../../../host/stores'
import { readElementListingFilterValues } from '../../../host/use-element-listing-filters'

export const SearchTermFilter = (): React.JSX.Element => {
  const { values, setValue: setAppliedValue } = useAppliedFilters()
  const appliedSearchTerm = readElementListingFilterValues(values).searchTerm
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(appliedSearchTerm)
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const draftStore = useDraftFiltersOptional()

  useEffect(() => {
    setCurrentSearchTerm(appliedSearchTerm)
  }, [appliedSearchTerm])

  function onSearch (): void {
    if (!handleSearchTermInSidebar) {
      setAppliedValue('searchTerm', currentSearchTerm)
    } else {
      draftStore?.setValue('searchTerm', currentSearchTerm)
    }
  }

  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setCurrentSearchTerm(event.target.value)

    if (handleSearchTermInSidebar) {
      draftStore?.setValue('searchTerm', event.target.value)
    }
  }

  return (
    <SearchInput
      className='w-full'
      data-testid="search-term-filter-input"
      maxWidth={ '100%' }
      onChange={ onChange }
      onSearch={ onSearch }
      placeholder='Search'
      value={ currentSearchTerm }
    />
  )
}
