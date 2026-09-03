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
import { useTranslation } from 'react-i18next'
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Compact } from '@Pimcore/components/compact/compact'
import { Text } from '@Pimcore/components/text/text'
import { useAppliedFilters, useDraftFiltersOptional } from '../../../element-filters/stores'
import { readElementFilterValues } from '../../../element-filters/use-element-filter-values'
import { useSearchMode } from '../../../search-modes/use-search-mode'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'

export interface SearchTermFilterProps {
  /** Called with the term whenever the user commits a search (Enter, search icon, clear). */
  onCommit?: (searchTerm: string) => void
}

export const SearchTermFilter = ({ onCommit }: SearchTermFilterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { values, setValue: setAppliedValue } = useAppliedFilters()
  const appliedSearchTerm = readElementFilterValues(values).searchTerm
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(appliedSearchTerm)
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const draftStore = useDraftFiltersOptional()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useData()
  const searchMode = useSearchMode(handleSearchTermInSidebar ? 'draft' : 'applied')

  useEffect(() => {
    setCurrentSearchTerm(appliedSearchTerm)
  }, [appliedSearchTerm])

  const draftSearchTerm = draftStore !== undefined
    ? readElementFilterValues(draftStore.values).searchTerm
    : ''
  const value = handleSearchTermInSidebar ? draftSearchTerm : currentSearchTerm

  // antd supplies the committed value directly — clearing fires onChange and onSearch in the
  // same tick, so reading the term from state here would still yield the pre-clear value.
  function onSearch (searchTerm: string): void {
    if (searchTerm === appliedSearchTerm) {
      return
    }

    // Immediate-apply surfaces must not submit a blocked mode; the warning below the input
    // explains what to select first. Sidebar surfaces gate the Apply button instead. Clearing
    // (empty term) must stay allowed, or a blocked mode keeps the stale applied query active.
    if (!handleSearchTermInSidebar && searchMode?.blocked === true && searchTerm !== '') {
      return
    }

    setAppliedValue('searchTerm', searchTerm)
    setPage(1)
    setDataLoadingState('filters-applied')
    onCommit?.(searchTerm)
  }

  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    if (handleSearchTermInSidebar) {
      draftStore?.setValue('searchTerm', event.target.value)
    } else {
      setCurrentSearchTerm(event.target.value)
    }
  }

  const searchInput = (
    <SearchInput
      className='w-full'
      data-testid="search-term-filter-input"
      maxWidth={ '100%' }
      onChange={ onChange }
      onSearch={ onSearch }
      placeholder={ searchMode?.activeMode !== undefined ? t('listing.search-mode.smart-placeholder') : 'Search' }
      value={ value }
    />
  )

  const warning = searchMode?.availability?.warning

  return (
    <div className='w-full'>
      <Compact className='w-full'>
        <SlotRenderer slot={ componentConfig.element.listing.search.slots.prefix.name } />
        {searchInput}
      </Compact>
      {warning !== undefined && (
        <Text type='warning'>{warning}</Text>
      )}
    </div>
  )
}
