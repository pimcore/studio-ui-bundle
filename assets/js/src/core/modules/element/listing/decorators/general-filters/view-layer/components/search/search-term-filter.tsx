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
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import cn from 'classnames'
import { useStyles } from './search-term-filter.styles'

export interface SearchTermFilterProps {
  /** Called with the term whenever the user commits a search (Enter, search icon, clear). */
  onCommit?: (searchTerm: string) => void
  /**
   * Controls rendered in the same row, left of the search input (e.g. the search modal's type and
   * class selects). Passing them here instead of wrapping the component keeps the blocked-mode
   * warning line aligned with the full row.
   */
  prefixControls?: React.ReactNode
}

export const SearchTermFilter = ({ onCommit, prefixControls }: SearchTermFilterProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { values, setValue: setAppliedValue, setValues: setAppliedValues } = useAppliedFilters()
  const appliedSearchTerm = readElementFilterValues(values).searchTerm
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(appliedSearchTerm)
  const [blockedAttempt, setBlockedAttempt] = useState<boolean>(false)
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

    // A blocked mode must not be submitted from any surface; the warning below the input explains
    // what to select first, and the attempt flips the input into an error state so the refusal is
    // unmissable. Clearing (empty term) stays allowed, or a blocked mode would keep the stale
    // applied query active.
    if (searchMode?.blocked === true && searchTerm !== '') {
      setBlockedAttempt(true)
      return
    }

    // The sidebar drafts mode and field filters until Apply — the search icon/Enter shortcut
    // must commit them along with the term: a smart mode whose availability depends on drafted
    // field filters would otherwise arrive blocked in the applied state and silently degrade to
    // full text, and the draft would be re-seeded from the applied store, visibly reverting the
    // selection. (pql is left untouched — the advanced editor applies through the Apply button.)
    if (handleSearchTermInSidebar && draftStore !== undefined) {
      const draftValues = readElementFilterValues(draftStore.values)
      setAppliedValues({
        searchMode: draftValues.searchMode,
        fieldFilters: draftValues.fieldFilters,
        directChildren: draftValues.directChildren,
        unreferenced: draftValues.unreferenced
      })
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

  const isBlocked = searchMode?.blocked === true
  const searchInput = (
    <SearchInput
      className='w-full'
      data-testid="search-term-filter-input"
      maxWidth={ '100%' }
      onChange={ onChange }
      onSearch={ onSearch }
      placeholder={ searchMode?.activeMode !== undefined ? t('listing.search-mode.smart-placeholder') : 'Search' }
      status={ blockedAttempt ? 'error' : undefined }
      value={ value }
    />
  )

  // A resolved block or a submitted search clears the attempted-while-blocked error state.
  useEffect(() => {
    if (!isBlocked && blockedAttempt) {
      setBlockedAttempt(false)
    }
  }, [isBlocked, blockedAttempt])

  const warning = searchMode?.availability?.warning
  const searchBar = (
    <Compact className='w-full'>
      <SlotRenderer slot={ componentConfig.element.listing.search.slots.prefix.name } />
      {searchInput}
    </Compact>
  )

  return (
    <div className='w-full'>
      {prefixControls === undefined
        ? searchBar
        : (
          <Flex
            className='w-full'
            gap='extra-small'
          >
            {prefixControls}
            {searchBar}
          </Flex>
          )}
      {warning !== undefined && (
        <div className={ cn(styles.warning, { [styles.warningAttempted]: blockedAttempt }) }>
          <Icon
            options={ { width: 12, height: 12 } }
            value='question-mark-outline'
          />
          <Text>{warning}</Text>
        </div>
      )}
    </div>
  )
}
