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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { useApplySavedSearch } from './use-apply-saved-search'

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
  const applySavedSearch = useApplySavedSearch()

  useEffect(() => {
    if (isNil(pendingRestore) || resolveSavedSearchElementType(pendingRestore) !== elementType) {
      return
    }
    // Wait for available columns before applying, otherwise the saved column layout is dropped.
    if (!isEmpty(pendingRestore.columns) && isEmpty(availableColumns)) {
      return
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore, availableColumns])

  return null
}
