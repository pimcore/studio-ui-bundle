/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { useAppliedFiltersOptional, useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { dropVanishedModeColumnFilters, mergeAvailableColumns } from './search-mode-columns'
import { useFilterableColumnSources } from './use-filterable-columns'

/**
 * When the search mode of the given store changes, removes field filters on columns only the previous mode
 * provided; otherwise they stay hidden in the store, get applied and saved, and return with the mode.
 * 'draft' runs in the filter panel; 'applied' runs with the listing query, as immediate-apply surfaces
 * (search term field, search modal) switch the applied mode directly.
 */
export const useDropVanishedModeColumnFilters = (source: 'draft' | 'applied' = 'draft'): void => {
  const draftStore = useDraftFiltersOptional()
  const appliedStore = useAppliedFiltersOptional()
  const store = source === 'draft' ? draftStore : appliedStore
  const { availableColumns, modeColumns } = useFilterableColumnSources(source)
  const searchModeId = store === undefined ? undefined : readElementFilterValues(store.values).searchMode

  const previous = useRef({ searchModeId, modeColumns })
  useEffect(() => {
    const { searchModeId: previousModeId, modeColumns: previousModeColumns } = previous.current
    previous.current = { searchModeId, modeColumns }

    if (store === undefined || previousModeId === searchModeId) {
      return
    }

    const { fieldFilters } = readElementFilterValues(store.values)
    const kept = dropVanishedModeColumnFilters(fieldFilters, previousModeColumns, mergeAvailableColumns(availableColumns, modeColumns))

    if (kept !== fieldFilters) {
      store.setValue('fieldFilters', kept)
    }
  }, [searchModeId, modeColumns])
}
