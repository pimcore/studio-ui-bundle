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
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Document search listing. Applies a pending document saved
 * search once the available columns have loaded; asset / data-object searches are left to their own
 * appliers.
 */
export const DocumentSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const applySavedSearch = useApplySavedSearch()

  useEffect(() => {
    if (isNil(pendingRestore)) {
      return
    }
    if (resolveSavedSearchElementType(pendingRestore) !== elementTypes.document) {
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
