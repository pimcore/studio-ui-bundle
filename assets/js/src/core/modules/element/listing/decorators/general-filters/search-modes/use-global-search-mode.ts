/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { FULLTEXT_SEARCH_MODE_ID, type SearchModeAbstract, type SearchModeAvailability, type SearchModeContext } from './search-mode-abstract'
import { type SearchModeRegistry } from './search-mode-registry'

export interface UseGlobalSearchModeReturn {
  /** Modes with a global adapter that are available on the All tab, sorted by order. */
  modes: SearchModeAbstract[]
  modeContext: SearchModeContext
  activeModeId: string
  activeMode: SearchModeAbstract | undefined
  availability: SearchModeAvailability | undefined
  setModeId: (id: string) => void
}

const globalModeContext: SearchModeContext = {
  elementType: 'all',
  className: undefined,
  selectedTypes: [],
  hasExplicitSorting: false
}

/** Search-mode state of the All tab. It has no filter store, so the mode lives in the shared search context. */
export const useGlobalSearchMode = (): UseGlobalSearchModeReturn => {
  const registry = useInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
  const { searchMode, setSearchMode } = useSearch()

  const modes = registry.getDynamicTypes()
    .filter((mode) => mode.isVisible() && mode.getGlobalSearch !== undefined && mode.getAvailability(globalModeContext).available)
    .sort((a, b) => a.order - b.order)

  const activeMode = searchMode === FULLTEXT_SEARCH_MODE_ID
    ? undefined
    : modes.find((mode) => mode.id === searchMode)

  return {
    modes,
    modeContext: globalModeContext,
    activeModeId: activeMode?.id ?? FULLTEXT_SEARCH_MODE_ID,
    activeMode,
    availability: activeMode?.getAvailability(globalModeContext),
    setModeId: setSearchMode
  }
}
