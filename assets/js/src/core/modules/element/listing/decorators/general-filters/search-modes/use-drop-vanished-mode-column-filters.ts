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
import { useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { dropVanishedModeColumnFilters, mergeAvailableColumns } from './search-mode-columns'
import { useFilterableColumnSources } from './use-filterable-columns'

/**
 * When the draft search mode changes, removes draft field filters on columns only the previous mode
 * provided; otherwise they stay hidden in the store, get applied and saved, and return with the mode.
 */
export const useDropVanishedModeColumnFilters = (): void => {
  const draftStore = useDraftFiltersOptional()
  const { availableColumns, modeColumns } = useFilterableColumnSources('draft')
  const searchModeId = draftStore === undefined ? undefined : readElementFilterValues(draftStore.values).searchMode

  const previous = useRef({ searchModeId, modeColumns })
  useEffect(() => {
    const { searchModeId: previousModeId, modeColumns: previousModeColumns } = previous.current
    previous.current = { searchModeId, modeColumns }

    if (draftStore === undefined || previousModeId === searchModeId) {
      return
    }

    const { fieldFilters } = readElementFilterValues(draftStore.values)
    const kept = dropVanishedModeColumnFilters(fieldFilters, previousModeColumns, mergeAvailableColumns(availableColumns, modeColumns))

    if (kept !== fieldFilters) {
      draftStore.setValue('fieldFilters', kept)
    }
  }, [searchModeId, modeColumns])
}
