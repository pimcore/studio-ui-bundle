/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { SearchContext } from '@Pimcore/modules/search/provider/search-provider'
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFilters } from '../../../element-filters/stores'
import { readElementFilterValues } from '../../../element-filters/use-element-filter-values'
import { useSearchMode } from '../../../search-modes/use-search-mode'
import { SearchModeDropdown } from './search-mode-dropdown'

/**
 * Default entry of the `element.listing.search.slots.prefix` component slot. Self-contained: it
 * reads the listing context itself (no props), so any other component can occupy the same slot.
 * Renders nothing when the host listing has no element type or no mode can work on it.
 */
export const SearchModeSelect = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const searchMode = useSearchMode(handleSearchTermInSidebar ? 'draft' : 'applied')
  const { values } = useAppliedFilters()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useData()
  // Present inside the quick search: mode changes in its typed tabs also update the shared mode,
  // so the choice carries over when switching tabs.
  const searchContext = useContext(SearchContext)

  if (searchMode === undefined) {
    return null
  }

  const { modes, modeContext, activeModeId, activeMode } = searchMode

  // available: false = the mode can never work on this surface (e.g. image search on data
  // objects) and is hidden; a restricted mode stays selectable with its warning.
  const availableModes = modes.filter((mode) => mode.getAvailability(modeContext).available)

  if (availableModes.length === 0) {
    return null
  }

  const appliedSearchTerm = readElementFilterValues(values).searchTerm

  function onModeChange (modeId: string): void {
    if (searchMode === undefined || modeId === searchMode.activeModeId) {
      return
    }

    searchMode.setModeId(modeId)

    if (!handleSearchTermInSidebar) {
      searchContext?.setSearchMode(modeId)
    }

    // Immediate-apply surfaces re-run the applied term under the new mode; sidebar surfaces
    // apply on the Apply button instead.
    if (!handleSearchTermInSidebar && appliedSearchTerm !== '') {
      setPage(1)
      setDataLoadingState('filters-applied')
    }
  }

  return (
    <SearchModeDropdown
      activeMode={ activeMode }
      activeModeId={ activeModeId }
      fulltextLabel={ handleSearchTermInSidebar ? t('listing.search-mode.full-text-short') : t('listing.search-mode.default') }
      modeContext={ modeContext }
      modes={ availableModes }
      onModeChange={ onModeChange }
    />
  )
}
