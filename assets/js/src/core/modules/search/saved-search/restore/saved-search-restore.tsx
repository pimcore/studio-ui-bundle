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
import { isEmpty, isNil } from 'lodash'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { restoredColumnKeys, useApplySavedSearch } from './use-apply-saved-search'

interface SavedSearchRestoreProps {
  elementType?: ElementType
}

/**
 * Logic-only component mounted inside a search listing. Applies a pending saved search of the
 * matching element type once the available columns have loaded; searches for other element types are
 * left to their own listing's applier. Data Object searches need class selection first, so they use
 * ObjectSavedSearchRestore instead.
 */
export const SavedSearchRestore = ({ elementType }: SavedSearchRestoreProps): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const { selectedColumns } = useSelectedColumns()
  const applySavedSearch = useApplySavedSearch()

  useEffect(() => {
    if (isNil(pendingRestore) || resolveSavedSearchElementType(pendingRestore) !== elementType) {
      return
    }
    // Wait for the available columns before applying, otherwise the saved column layout (and
    // widths) is dropped — useApplySavedSearch needs them to map the saved columns.
    const savedColumns = (pendingRestore.columns ?? []) as never[]
    if (!isEmpty(savedColumns) && isEmpty(availableColumns)) {
      return
    }

    // Convergent, not one-shot: a late default-configuration write (a config loader mounting
    // after the apply) overwrites the restored columns, so the restore is only CONSUMED once
    // the grid actually carries the saved layout — until then every clobber re-applies it.
    const expected = restoredColumnKeys(savedColumns, availableColumns)
    const applied = expected.length === 0 ||
      (selectedColumns.length === expected.length && expected.every((key, index) => selectedColumns[index]?.key === key))

    if (!applied) {
      applySavedSearch(pendingRestore)
      return
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore, availableColumns, selectedColumns])

  return null
}
