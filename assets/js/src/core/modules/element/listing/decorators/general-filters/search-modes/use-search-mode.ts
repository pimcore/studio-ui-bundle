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
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFiltersOptional, useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { type SearchModeAbstract, type SearchModeAvailability, type SearchModeContext } from './search-mode-abstract'
import { type SearchModeRegistry } from './search-mode-registry'
import { FULLTEXT_SEARCH_MODE_ID } from './constants'

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

/** Search-modal top bars narrow via the type select (null = all types), grids via a "type" field filter. */
const readSelectedTypes = (typeSelectValue: string | null | undefined, fieldFilters: FieldFilter[]): string[] => {
  if (typeSelectValue !== undefined) {
    return typeSelectValue === null ? [] : [typeSelectValue]
  }

  return fieldFilters
    .filter((fieldFilter) => fieldFilter.key === 'type')
    .flatMap((fieldFilter): string[] => {
      const value: unknown = fieldFilter.filterValue

      if (typeof value === 'string') {
        return [value]
      }

      return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
    })
}

/**
 * Search-mode state read from the 'draft' (sidebar) or 'applied' (search-modal top bars) filter store.
 * Undefined when the listing declares no elementType or has no such store: plain search bar.
 */
export const useSearchMode = (source: 'draft' | 'applied'): UseSearchModeReturn | undefined => {
  const registry = useInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
  const { elementType } = useGeneralFiltersConfig()
  const classSelection = useClassDefinitionSelectionOptional()
  const typeSelect = useTypeSelectOptional()
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
    className: classSelection?.selectedClassDefinition?.name,
    selectedTypes: readSelectedTypes(typeSelect?.value, values.fieldFilters),
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
