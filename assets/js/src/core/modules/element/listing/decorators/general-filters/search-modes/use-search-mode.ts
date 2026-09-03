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
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useTypeSelectOptional } from '@Pimcore/modules/element/components/type-select/provider/use-type-select-optional'
import { SortingContext } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFilters, useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { type SearchModeAbstract, type SearchModeAvailability, type SearchModeContext } from './search-mode-abstract'
import { type SearchModeRegistry } from './search-mode-registry'
import { FULLTEXT_SEARCH_MODE_ID } from './constants'

export interface UseSearchModeReturn {
  /** Visible registered modes, sorted by order. Empty = render the plain search bar. */
  modes: SearchModeAbstract[]
  modeContext: SearchModeContext
  activeModeId: string
  /** undefined = full text (or an unresolvable stored id, which degrades to full text). */
  activeMode: SearchModeAbstract | undefined
  availability: SearchModeAvailability | undefined
  /** True when the active mode must not be submitted (Apply/Enter disabled). */
  blocked: boolean
  setModeId: (id: string) => void
}

/**
 * Search-mode state for one value source: 'draft' evaluates the sidebar's draft filters (Apply
 * gating), 'applied' the immediately-applied ones (search-modal top bars). Returns undefined
 * when the host listing declares no elementType — such listings keep the plain search bar.
 */
export const useSearchMode = (source: 'draft' | 'applied'): UseSearchModeReturn | undefined => {
  const registry = useInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
  const { elementType } = useGeneralFiltersConfig()
  const classSelection = useClassDefinitionSelectionOptional()
  const typeSelect = useTypeSelectOptional()
  const sortingContext = useContext(SortingContext)
  const { decodeColumnIdentifier } = useSelectedColumns()
  const appliedStore = useAppliedFilters()
  const draftStore = useDraftFiltersOptional()

  if (elementType === undefined) {
    return undefined
  }

  const store = source === 'draft' ? draftStore : appliedStore
  if (store === undefined) {
    return undefined
  }

  const values = readElementFilterValues(store.values)

  const hasExplicitSorting = (sortingContext?.sorting ?? []).some(
    (sort) => decodeColumnIdentifier(sort.id) !== undefined
  )

  const modeContext: SearchModeContext = {
    elementType,
    classId: classSelection?.selectedClassDefinition?.id,
    className: classSelection?.selectedClassDefinition?.name,
    fieldFilters: values.fieldFilters,
    selectedTypeFilter: typeSelect?.value,
    hasExplicitSorting
  }

  const modes = registry.getDynamicTypes()
    .filter((mode) => mode.isVisible())
    .sort((a, b) => a.order - b.order)

  const activeModeId = values.searchMode
  const activeMode = activeModeId === FULLTEXT_SEARCH_MODE_ID
    ? undefined
    : modes.find((mode) => mode.id === activeModeId)
  const availability = activeMode?.getAvailability(modeContext)

  return {
    modes,
    modeContext,
    activeModeId: activeMode?.id ?? FULLTEXT_SEARCH_MODE_ID,
    activeMode,
    availability,
    blocked: availability !== undefined && (availability.blocked || !availability.available),
    setModeId: (id) => { store.setValue('searchMode', id) }
  }
}
