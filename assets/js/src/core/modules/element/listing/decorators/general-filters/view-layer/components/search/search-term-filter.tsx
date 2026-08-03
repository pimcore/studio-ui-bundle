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
import { useAppliedFilters, useDraftFiltersOptional } from '../../../element-filters/stores'
import { readElementFilterValues } from '../../../element-filters/use-element-filter-values'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'

export const SearchTermFilter = (): React.JSX.Element => {
  const { values, setValue: setAppliedValue } = useAppliedFilters()
  const appliedSearchTerm = readElementFilterValues(values).searchTerm
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(appliedSearchTerm)
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const draftStore = useDraftFiltersOptional()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useData()

  useEffect(() => {
    setCurrentSearchTerm(appliedSearchTerm)
  }, [appliedSearchTerm])

  const draftSearchTerm = draftStore !== undefined
    ? readElementFilterValues(draftStore.values).searchTerm
    : ''
  const value = handleSearchTermInSidebar ? draftSearchTerm : currentSearchTerm

  function onSearch (): void {
    const searchTerm = handleSearchTermInSidebar ? draftSearchTerm : currentSearchTerm

    if (searchTerm === appliedSearchTerm) {
      return
    }

    setAppliedValue('searchTerm', searchTerm)
    setPage(1)
    setDataLoadingState('filters-applied')
  }

  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    if (handleSearchTermInSidebar) {
      draftStore?.setValue('searchTerm', event.target.value)
    } else {
      setCurrentSearchTerm(event.target.value)
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
      value={ value }
    />
  )
}
