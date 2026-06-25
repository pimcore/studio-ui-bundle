/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isArray, isNil } from 'lodash'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useAppDispatch } from '@Pimcore/app/store'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { setSavedSearchDirty, clearSavedSearchDirty } from './saved-search-dirty-slice'

interface SavedSearchDirtyTrackerProps {
  elementType?: ElementType
}

const getFilterObject = (raw: unknown): { columnFilters?: unknown[], includeDescendants?: boolean } | undefined =>
  (isArray(raw) ? raw[0] : raw) as { columnFilters?: unknown[], includeDescendants?: boolean } | undefined

// Only the user-controllable column attributes (presence, order, width).
const normaliseColumns = (columns: unknown): string =>
  JSON.stringify((isArray(columns) ? columns : []).map((column) => ({
    key: (column as { key?: string })?.key,
    width: (column as { width?: number | null })?.width ?? null
  })))

// Column filters compared by key + type + value, order-independent. Excludes paging and sorting,
// which the restore does not round-trip (paging) / restore yet (sorting).
const normaliseColumnFilters = (filter: ReturnType<typeof getFilterObject>): string => {
  const entries = (isArray(filter?.columnFilters) ? filter.columnFilters : []) as Array<{ key?: string, type?: string, filterValue?: unknown }>
  return JSON.stringify(
    entries
      .map((entry) => ({ key: entry.key, type: entry.type, value: JSON.stringify(entry.filterValue ?? null) }))
      .sort((a, b) => `${a.key}${a.type}`.localeCompare(`${b.key}${b.type}`))
  )
}

/**
 * Logic-only component mounted inside a saved-search result listing. It compares the live grid state
 * (columns + filters) against the loaded saved search and records the dirty flag so the main-area
 * tab can show the "*" indicator. Inactive until the pending restore has been applied, and in the
 * Quick Search modal (where no saved search is loaded).
 */
export const SavedSearchDirtyTracker = ({ elementType }: SavedSearchDirtyTrackerProps): null => {
  const { loadedSavedSearch, pendingRestore } = useSearch()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { selectedColumns } = useSelectedColumns()
  const { dataQueryResult } = useData()
  const dispatch = useAppDispatch()

  const id = loadedSavedSearch?.id
  // Active only once the restore is applied (no pendingRestore) AND the listing has loaded its data.
  // Without the data-loaded gate, the comparison runs against the still-settling state during the
  // initial load and briefly reports dirty (a "*" flash) before correcting.
  const active = !isNil(loadedSavedSearch) && isNil(pendingRestore) && !isNil(dataQueryResult) &&
    resolveSavedSearchElementType(loadedSavedSearch) === elementType

  let dirty = false
  if (active && !isNil(loadedSavedSearch)) {
    const liveFilter = getFilterObject((getArgs() as { body?: { filters?: unknown } })?.body?.filters)
    const loadedFilter = getFilterObject(loadedSavedSearch.filter)
    dirty =
      normaliseColumns(selectedColumns) !== normaliseColumns(loadedSavedSearch.columns) ||
      normaliseColumnFilters(liveFilter) !== normaliseColumnFilters(loadedFilter) ||
      (liveFilter?.includeDescendants ?? true) !== (loadedFilter?.includeDescendants ?? true)
  }

  useEffect(() => {
    if (isNil(id) || !active) {
      return
    }
    dispatch(setSavedSearchDirty({ id, dirty }))
  }, [id, dirty, active])

  useEffect(() => {
    return () => {
      if (!isNil(id)) {
        dispatch(clearSavedSearchDirty(id))
      }
    }
  }, [id])

  return null
}
