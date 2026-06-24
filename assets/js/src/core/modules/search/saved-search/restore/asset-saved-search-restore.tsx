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
import { isEmpty, isNil, isString } from 'lodash'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Asset search listing. Applies a pending asset saved
 * search (one without a classId) once the available columns have loaded.
 */
export const AssetSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const applySavedSearch = useApplySavedSearch()

  useEffect(() => {
    if (isNil(pendingRestore)) {
      return
    }
    // A classId means this belongs to the Data Object tab — let that applier handle it.
    if (isString(pendingRestore.classId) && !isEmpty(pendingRestore.classId)) {
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
