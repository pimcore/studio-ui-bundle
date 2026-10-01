/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { SortingContext } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFiltersOptional, useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { FULLTEXT_SEARCH_MODE_ID, type SearchModeAbstract, type SearchModeAvailability, type SearchModeContext } from './search-mode-abstract'
import { type SearchModeRegistry } from './search-mode-registry'

export interface UseSearchModeReturn {
  /** Visible registered modes, sorted by order. */
  modes: SearchModeAbstract[]
  modeContext: SearchModeContext
  activeModeId: string
  /** undefined = full text (also for a stored id no visible mode matches). */
  activeMode: SearchModeAbstract | undefined
  availability: SearchModeAvailability | undefined
  /** The stored mode cannot work on this surface (e.g. a restored saved search); queries fall back to full text. */
  unavailable: boolean
  /** Filter types of all registered modes, hidden ones included. */
  registeredFilterTypes: string[]
  setModeId: (id: string) => void
}

/**
 * The sidebar edits a draft copy of the filters until Apply, so its dropdown reads 'draft' while the
 * query reads 'applied'; the search modal has no draft store. Undefined = no modes on this listing.
 */
export const useSearchMode = (source: 'draft' | 'applied'): UseSearchModeReturn | undefined => {
  const registry = useInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
  const { elementType } = useGeneralFiltersConfig()
  const sortingContext = useContext(SortingContext)
  const { decodeColumnIdentifier } = useSelectedColumns()
  const appliedStore = useAppliedFiltersOptional()
  const draftStore = useDraftFiltersOptional()

  const store = source === 'draft' ? draftStore : appliedStore
  if (elementType === undefined || store === undefined) {
    return undefined
  }

  const values = readElementFilterValues(store.values)

  const modeContext: SearchModeContext = {
    elementType,
    hasExplicitSorting: (sortingContext?.sorting ?? []).some((sort) => decodeColumnIdentifier(sort.id) !== undefined)
  }

  const registeredModes = registry.getDynamicTypes()
  const modes = registeredModes
    .filter((mode) => mode.isVisible())
    .sort((a, b) => a.order - b.order)

  const activeMode = values.searchMode === FULLTEXT_SEARCH_MODE_ID
    ? undefined
    : modes.find((mode) => mode.id === values.searchMode)
  const availability = activeMode?.getAvailability(modeContext)

  return {
    modes,
    modeContext,
    activeModeId: activeMode?.id ?? FULLTEXT_SEARCH_MODE_ID,
    activeMode,
    availability,
    unavailable: availability !== undefined && !availability.available,
    registeredFilterTypes: registeredModes.map((mode) => mode.columnFilterType),
    setModeId: (id) => { store.setValue('searchMode', id) }
  }
}
