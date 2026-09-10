/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { useAppliedFilters, useDraftFiltersOptional } from '../../../element-filters/stores'
import { readElementFilterValues } from '../../../element-filters/use-element-filter-values'
import { useSearchMode } from '../../../search-modes/use-search-mode'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { SearchContext } from '@Pimcore/modules/search/provider/search-provider'
import { SearchBar } from './search-bar'
import { SearchModeDropdown } from './search-mode-dropdown'

export interface SearchTermFilterProps {
  /** Called with the term whenever the user commits a search (Enter, search icon, clear). */
  onCommit?: (searchTerm: string) => void
  /** Same row, left of the search input (e.g. the search modal's type and class selects). */
  prefixControls?: React.ReactNode
}

export const SearchTermFilter = ({ onCommit, prefixControls }: SearchTermFilterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { values, setValues: setAppliedValues } = useAppliedFilters()
  const appliedSearchTerm = readElementFilterValues(values).searchTerm
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(appliedSearchTerm)
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const draftStore = useDraftFiltersOptional()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useData()
  const searchMode = useSearchMode(handleSearchTermInSidebar ? 'draft' : 'applied')
  // Present inside the quick search only; the typed tabs share their mode through it.
  const searchContext = useContext(SearchContext)

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

    // The sidebar drafts the mode until Apply; the term shortcut takes it along, or the draft
    // re-syncs from the applied store and the selection reverts.
    setAppliedValues(handleSearchTermInSidebar && searchMode !== undefined
      ? { searchTerm, searchMode: searchMode.activeModeId }
      : { searchTerm }
    )
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

  function onModeChange (modeId: string): void {
    if (searchMode === undefined || modeId === searchMode.activeModeId) {
      return
    }

    searchMode.setModeId(modeId)

    // The sidebar applies on the Apply button; immediate-apply surfaces re-run the term now.
    if (handleSearchTermInSidebar) {
      return
    }

    searchContext?.setSearchMode(modeId)

    if (appliedSearchTerm !== '') {
      setPage(1)
      setDataLoadingState('filters-applied')
    }
  }

  // available: false = the mode can never work on this surface (e.g. image search on data objects).
  const availableModes = searchMode?.modes.filter((mode) => mode.getAvailability(searchMode.modeContext).available) ?? []

  const modeDropdown = searchMode !== undefined && availableModes.length > 0
    ? (
      <SearchModeDropdown
        activeMode={ searchMode.activeMode }
        activeModeId={ searchMode.activeModeId }
        fulltextLabel={ handleSearchTermInSidebar ? t('listing.search-mode.full-text-short') : t('listing.search-mode.default') }
        modeContext={ searchMode.modeContext }
        modes={ availableModes }
        onModeChange={ onModeChange }
      />
      )
    : undefined

  return (
    <SearchBar
      modeDropdown={ modeDropdown }
      prefixControls={ prefixControls }
      warning={ searchMode?.availability?.warning }
    >
      <SearchInput
        className='w-full'
        data-testid="search-term-filter-input"
        maxWidth={ '100%' }
        onChange={ onChange }
        onSearch={ onSearch }
        placeholder={ searchMode?.activeMode !== undefined ? t('listing.search-mode.smart-placeholder') : 'Search' }
        value={ value }
      />
    </SearchBar>
  )
}
