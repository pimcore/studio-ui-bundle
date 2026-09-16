/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import { type FilterCommit, type FilterValues } from '@Pimcore/components/filters'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useGeneralFiltersConfig } from '../../../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { useSearchMode } from '../../../../../search-modes/use-search-mode'
import { elementFilterDefaults, readElementFilterValues, useAppliedFilters, useDraftFilterValues } from '../../../../../element-filters'
import { useFieldFilterEditor, type UseFieldFilterEditorReturn } from './field-filters/use-field-filter-editor'
import { buildAppliedValues } from './build-applied-values'

export interface UseFilterPanelReturn {
  isPqlFilterEnabled: boolean
  /** Publishes the draft. Handed to `FilterCommitProvider` so controls can apply on their own. */
  applyFilters: FilterCommit
  onApplyClick: () => void
  onClearAllClick: () => void
  onPqlFilterToggle: (enabled: boolean) => void
  fieldFilterEditor: UseFieldFilterEditorReturn
}

/**
 * Encapsulates the filter panel's state and its four ways of applying, so the panel component
 * stays a layout. What gets published is decided by `buildAppliedValues`, which is pure.
 */
export const useFilterPanel = (): UseFilterPanelReturn => {
  const [isPqlFilterEnabled, setIsPqlFilterEnabled] = useState<boolean>(false)

  const { setPage } = usePaging()
  const { values: appliedValues, setValues: setAppliedValues } = useAppliedFilters()
  const { handleSearchTermInSidebar, showOnlyUnreferencedFilter } = useGeneralFiltersConfig()
  const { setDataLoadingState } = useData()

  const draft = useDraftFilterValues()
  const searchMode = useSearchMode('draft')

  /** Publishes values and sends the listing back to the first page. */
  const publish = (values: FilterValues): void => {
    setAppliedValues(values)
    setPage(1)
    setDataLoadingState('filters-applied')
  }

  const applyFilters: FilterCommit = (committed) => {
    publish(buildAppliedValues({
      draft,
      ownsSearchTerm: handleSearchTermInSidebar,
      ownsUnreferenced: showOnlyUnreferencedFilter === true,
      isPqlFilterEnabled,
      searchModeId: searchMode?.activeModeId ?? draft.searchMode,
      committed
    }))
  }

  const fieldFilterEditor = useFieldFilterEditor({
    onCommit: (fieldFilters) => { applyFilters({ fieldFilters }) }
  })

  /**
   * A query that was already applied when the panel opened - a restored saved search - shows the
   * PQL filter as on, so it is visible and editable instead of silently active behind the
   * regular filters. Keyed on the applied value, not the draft: the draft changes on every
   * keystroke in the editor, and would switch the filter back on as the toggle switches it off.
   */
  const appliedPql = readElementFilterValues(appliedValues).pql
  useEffect(() => {
    if (appliedPql !== '') {
      setIsPqlFilterEnabled(true)
    }
  }, [appliedPql])

  const onApplyClick = (): void => {
    applyFilters()
  }

  /**
   * Clears every filter, the search term included, and applies that straight away. The neutral
   * state is published whole because `setValues` merges into what is already applied.
   *
   * Ownership is deliberately ignored here, unlike in `applyFilters`: "Clear all" means the
   * search term goes too, and a default for a filter this surface does not show cannot change
   * the result anyway.
   */
  const onClearAllClick = (): void => {
    draft.reset()
    setIsPqlFilterEnabled(false)
    publish(elementFilterDefaults)
  }

  /**
   * Switching the PQL filter off drops the query and re-runs without it; switching it on only
   * reveals an empty field, so there is nothing to apply yet. The blanked query is passed as a
   * committed value because the draft write above lands in the same render.
   */
  const onPqlFilterToggle = (enabled: boolean): void => {
    setIsPqlFilterEnabled(enabled)

    if (enabled) {
      return
    }

    draft.setPql('')
    applyFilters({ pql: '' })
  }

  return {
    isPqlFilterEnabled,
    applyFilters,
    onApplyClick,
    onClearAllClick,
    onPqlFilterToggle,
    fieldFilterEditor
  }
}
