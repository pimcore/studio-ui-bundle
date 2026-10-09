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
 * When the mode columns of the given store change (another mode, or the same mode becoming unavailable),
 * removes field filters on columns only the previous columns provided; otherwise they stay hidden in the
 * store, get applied and saved, and return with the columns.
 * 'draft' runs in the filter panel; 'applied' runs with the listing query, as immediate-apply surfaces
 * (search term field, search modal) switch the applied mode directly.
 */
export const useDropVanishedModeColumnFilters = (source: 'draft' | 'applied' = 'draft'): void => {
  const draftStore = useDraftFiltersOptional()
  const appliedStore = useAppliedFiltersOptional()
  const store = source === 'draft' ? draftStore : appliedStore
  const { availableColumns, modeColumns } = useFilterableColumnSources(source)

  const previousModeColumnsRef = useRef(modeColumns)
  useEffect(() => {
    const previousModeColumns = previousModeColumnsRef.current
    previousModeColumnsRef.current = modeColumns

    // modeColumns keeps its reference while its content is unchanged (useSearchModeColumns)
    if (store === undefined || previousModeColumns === modeColumns) {
      return
    }

    const { fieldFilters } = readElementFilterValues(store.values)
    const kept = dropVanishedModeColumnFilters(fieldFilters, previousModeColumns, mergeAvailableColumns(availableColumns, modeColumns))

    if (kept !== fieldFilters) {
      store.setValue('fieldFilters', kept)
    }
  }, [modeColumns])
}
