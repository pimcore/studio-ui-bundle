/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useMemo } from 'react'
import { useOptionalInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { SortingContext } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFiltersOptional, useDraftFiltersOptional } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { type SearchModeRegistry } from './search-mode-registry'
import { resolveSearchModeAdditionalColumns, toAdditionalSelectedColumn } from './search-mode-columns'

/**
 * Columns contributed by the search mode of the given filter store (SearchModeAbstract.getAdditionalColumns);
 * empty on listings without search modes. hasExplicitSorting only sees the columns decodeColumnIdentifier knows
 * (the selected ones): the mode columns are being resolved here, see SearchModeContext.hasExplicitSorting.
 */
export const useSearchModeColumns = (
  source: 'draft' | 'applied',
  decodeColumnIdentifier: (columnIdentifier: string) => SelectedColumn | undefined
): GridColumnConfiguration[] => {
  const registry = useOptionalInjection<SearchModeRegistry>(serviceIds['Element/Listing/SearchModeRegistry'])
  const { elementType } = useGeneralFiltersConfig()
  const appliedStore = useAppliedFiltersOptional()
  const draftStore = useDraftFiltersOptional()
  const sortingContext = useContext(SortingContext)

  const store = source === 'draft' ? draftStore : appliedStore
  const searchModeId = store === undefined ? undefined : readElementFilterValues(store.values).searchMode
  const hasExplicitSorting = (sortingContext?.sorting ?? []).some((sort) => decodeColumnIdentifier(sort.id) !== undefined)

  const columns = registry === null || elementType === undefined || searchModeId === undefined
    ? []
    : resolveSearchModeAdditionalColumns(registry.getDynamicTypes(), searchModeId, { elementType, hasExplicitSorting })

  // modes may build fresh objects per call; keyed on content so consumers do not recompute
  const signature = JSON.stringify(columns)

  return useMemo(() => columns, [signature])
}

/**
 * Columns contributed by the applied search mode, as selected columns. Read by SelectedColumnsProvider,
 * which sits below the general filters and sorting contexts.
 */
export const useSearchModeAdditionalColumns = (
  decodeColumnIdentifier: (columnIdentifier: string) => SelectedColumn | undefined
): SelectedColumn[] => {
  const columns = useSearchModeColumns('applied', decodeColumnIdentifier)

  return useMemo(() => columns.map(toAdditionalSelectedColumn), [columns])
}
