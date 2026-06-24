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
import { useSearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/search-term-filter/use-search-term-filter'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type SavedSearchDetailedConfiguration, type GridFilter } from '@Pimcore/modules/search/search-api-slice.gen'

const SEARCH_TERM_FILTER_TYPE = 'system.fulltext'

interface ColumnFilterEntry { key?: string, type?: string, filterValue?: unknown }
interface SavedColumn { key?: string, locale?: string | null, width?: number | null }

/** The backend models `filter` as an array but stores a single FilterParameter — normalise to one object. */
const getFilter = (configuration: SavedSearchDetailedConfiguration): GridFilter | undefined => {
  const raw = configuration.filter as unknown
  if (isArray(raw)) {
    return raw[0] as GridFilter | undefined
  }
  return (raw ?? undefined) as GridFilter | undefined
}

/**
 * Applies the parts of a saved search that map unambiguously back into the listing state:
 * search term, paging and the saved column layout, then triggers a reload.
 * (Type filter, field filters and sorting are intentionally not restored yet — see PR notes.)
 */
export const useApplySavedSearch = (): ((configuration: SavedSearchDetailedConfiguration) => void) => {
  const { setSearchTerm } = useSearchTermFilter()
  const { setPage, setPageSize } = usePaging()
  const { setSelectedColumns } = useSelectedColumns()
  const { availableColumns } = useAvailableColumns()
  const { setDataLoadingState } = useData()

  return (configuration: SavedSearchDetailedConfiguration): void => {
    const filter = getFilter(configuration)

    // Search term — the `system.fulltext` column filter.
    const columnFilters = (filter?.columnFilters ?? []) as ColumnFilterEntry[]
    const searchTermEntry = isArray(columnFilters)
      ? columnFilters.find((entry) => entry.type === SEARCH_TERM_FILTER_TYPE)
      : undefined
    setSearchTerm(isString(searchTermEntry?.filterValue) ? searchTermEntry.filterValue : '')

    if (isNumber(filter?.page)) {
      setPage(filter.page)
    }
    if (isNumber(filter?.pageSize)) {
      setPageSize(filter.pageSize)
    }

    // Columns — merge the saved key/locale/width with the live available-column definition
    // (same transform grid-config uses in with-column-configuration.tsx). Skipped if available
    // columns aren't loaded yet for this listing.
    const savedColumns = (configuration.columns ?? []) as SavedColumn[]
    if (!isEmpty(savedColumns) && !isEmpty(availableColumns)) {
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
      if (!isEmpty(selectedColumns)) {
        setSelectedColumns(selectedColumns)
      }
    }

    setDataLoadingState('config-changed')
  }
}
