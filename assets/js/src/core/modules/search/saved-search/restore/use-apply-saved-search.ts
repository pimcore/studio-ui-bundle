/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isEmpty, isNil, isNumber, isString } from 'lodash'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useAppliedFilters } from '@Pimcore/modules/element/listing/decorators/general-filters/element-filters'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type SavedSearchDetailedConfiguration, type GridFilter } from '@Pimcore/modules/search/search-api-slice.gen'
import { useTagFilter } from '@Pimcore/modules/asset/listing/decorator/tag-filter/context-layer/provider/tag-filter/use-tag-filter'
import { tagFilterType, type SelectedTags } from '@Pimcore/modules/asset/listing/decorator/tag-filter/context-layer/provider/tag-filter/tag-filter-provider'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type SearchModeRegistry } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-registry'
import { FULLTEXT_SEARCH_MODE_ID } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/constants'

const SEARCH_TERM_FILTER_TYPE = 'system.fulltext'
// Column-filter types that are not user field filters and must not be restored as such — each is
// restored through its own provider (search term, PQL, unreferenced, tags).
const SYSTEM_FILTER_TYPES = new Set([SEARCH_TERM_FILTER_TYPE, 'system.pql', 'system.unreferenced', tagFilterType])

// The element-type select (withTypeFilter) persists its value as a plain `system.string` column
// filter keyed 'type' rather than through its own system-filter type. It must be restored into the
// type select (not left as a user field filter) — otherwise a saved class-scoped search reopens
// classless: `classId` in the query is gated on the type select having a value (see
// use-data-query-helper.ts), so class-attribute field filters silently stop matching too.
const TYPE_FILTER_KEY = 'type'
const TYPE_FILTER_VALUE_TYPE = 'system.string'
const isTypeSelectEntry = (entry: ColumnFilterEntry): boolean =>
  entry.key === TYPE_FILTER_KEY && entry.type === TYPE_FILTER_VALUE_TYPE

interface ColumnFilterEntry {
  key?: string
  type?: string
  filterValue?: unknown
  locale?: string | null
  meta?: { translationKey?: string, [key: string]: unknown }
}
interface SavedColumn { key?: string, locale?: string | null, width?: number | null }

/** The backend models `filter` as an array but stores a single FilterParameter — normalise to one object. */
const getFilter = (configuration: SavedSearchDetailedConfiguration): GridFilter | undefined => {
  const raw = configuration.filter as unknown
  if (isArray(raw)) {
    return raw[0] as GridFilter | undefined
  }
  return (raw ?? undefined) as GridFilter | undefined
}

/** Merges the saved key/locale/width with the live available-column definition (same transform grid-config uses). */
const buildSelectedColumns = (savedColumns: SavedColumn[], availableColumns: AvailableColumn[]): SelectedColumn[] => {
  const selectedColumns: SelectedColumn[] = []
  for (const savedColumn of savedColumns) {
    const availableColumn = availableColumns.find((available) => available.key === savedColumn.key)
    if (isNil(availableColumn)) {
      continue
    }
    selectedColumns.push({
      key: savedColumn.key,
      locale: savedColumn.locale,
      type: availableColumn.type,
      config: availableColumn.config,
      sortable: availableColumn.sortable,
      editable: availableColumn.editable,
      localizable: availableColumn.localizable,
      exportable: availableColumn.exportable,
      frontendType: availableColumn.frontendType,
      group: availableColumn.group,
      width: savedColumn.width,
      originalApiDefinition: availableColumn
    })
  }
  return selectedColumns
}

/**
 * Applies the parts of a saved search that map back into the listing state: search term, field
 * filters, tags, the system filters (PQL, unreferenced, direct-children), the type select, paging
 * and the saved column layout, then triggers a reload. (Sorting is not restored yet — see PR notes.)
 */
export const useApplySavedSearch = (): ((configuration: SavedSearchDetailedConfiguration) => void) => {
  const { setValues: setAppliedFilters } = useAppliedFilters()
  const { setPage, setPageSize } = usePaging()
  const { setSelectedColumns } = useSelectedColumns()
  const { availableColumns } = useAvailableColumns()
  const { setTags } = useTagFilter()
  const { setDataLoadingState } = useData()
  const { setSearchTerm: setSharedSearchTerm } = useSearch()
  const { setValue: setType } = useTypeSelect()
  const searchModeRegistry = useInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])

  return (configuration: SavedSearchDetailedConfiguration): void => {
    const filter = getFilter(configuration)
    const entries = (isArray(filter?.columnFilters) ? filter.columnFilters : []) as ColumnFilterEntry[]

    // Search term — the `system.fulltext` column filter.
    const searchTermEntry = entries.find((entry) => entry.type === SEARCH_TERM_FILTER_TYPE)
    const searchTerm = isString(searchTermEntry?.filterValue) ? searchTermEntry.filterValue : ''

    // Field filters — every non-system column filter. The saved entries keep `meta`, so they can be
    // re-hydrated into the field-filters state (which re-keys them to columns by `key`). Always set
    // (empty when none) so opening a search replaces any filters from a previous one. The type-select
    // entry is excluded here — it is restored into the type select below instead. Search-mode
    // filters are excluded too: their queries are not restorable yet, so a saved smart search
    // degrades to full text instead of leaking its filter into the field-filter state.
    const searchModeFilterTypes = new Set(searchModeRegistry.getDynamicTypes().map((mode) => mode.columnFilterType))
    const fieldFilters: FieldFilter[] = entries
      .filter((entry) => isString(entry.type) && !SYSTEM_FILTER_TYPES.has(entry.type) &&
        !searchModeFilterTypes.has(entry.type) && !isTypeSelectEntry(entry))
      .map((entry) => ({
        key: entry.key ?? '',
        type: entry.type ?? '',
        filterValue: entry.filterValue,
        locale: entry.locale,
        meta: { translationKey: entry.meta?.translationKey ?? '', ...entry.meta }
      }))

    // System filters with their own sidebar controls.
    const pqlEntry = entries.find((entry) => entry.type === 'system.pql')
    const pql = isString(pqlEntry?.filterValue) ? pqlEntry.filterValue : ''
    const unreferenced = entries.find((entry) => entry.type === 'system.unreferenced')?.filterValue === true
    // The query sends `includeDescendants` (the inverse of the "only direct children" toggle).
    const directChildren = filter?.includeDescendants === false

    // Apply every general filter in one write to the applied-filters store. Always set each key (even
    // when empty/false) so opening a search replaces the state left over from a previous one. The
    // search mode resets to full text: the restored term is a `system.fulltext` value, and a mode
    // left over from before the restore would re-emit it through that mode's filter instead.
    setAppliedFilters({ searchTerm, fieldFilters, pql, unreferenced, directChildren, searchMode: FULLTEXT_SEARCH_MODE_ID })

    setSharedSearchTerm(searchTerm)

    // Tags — the `system.tag` column filter, applied via its own provider rather than as a field
    // filter. Always set (empty when none) so opening a search clears tags left over from a previous one.
    const tagEntry = entries.find((entry) => entry.type === tagFilterType)
    const restoredTags = (tagEntry?.filterValue as { tags?: SelectedTags } | undefined)?.tags
    setTags(isArray(restoredTags) ? restoredTags : [])

    // Type select — restored from the `type` column filter rather than as a field filter (see
    // isTypeSelectEntry). Always set (including null) so opening a search replaces a type left over
    // from a previous one.
    const typeEntry = entries.find(isTypeSelectEntry)
    setType(isString(typeEntry?.filterValue) ? typeEntry.filterValue : null)

    if (isNumber(filter?.page)) {
      setPage(filter.page)
    }
    if (isNumber(filter?.pageSize)) {
      setPageSize(filter.pageSize)
    }

    // Columns — merge the saved key/locale/width with the live available-column definition.
    // Skipped if available columns aren't loaded yet for this listing.
    const savedColumns = (configuration.columns ?? []) as SavedColumn[]
    if (!isEmpty(savedColumns) && !isEmpty(availableColumns)) {
      const selectedColumns = buildSelectedColumns(savedColumns, availableColumns)
      if (!isEmpty(selectedColumns)) {
        setSelectedColumns(selectedColumns)
      }
    }

    setDataLoadingState('config-changed')
  }
}
