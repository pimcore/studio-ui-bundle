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
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Asset search listing. When a saved search without a
 * `classId` (i.e. an asset search) is pending, it applies that search to this listing's state.
 */
export const AssetSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const applySavedSearch = useApplySavedSearch()

  useEffect(() => {
    if (isNil(pendingRestore)) {
      return
    }
    // A classId means this belongs to the Data Object tab — let that applier handle it.
    if (isString(pendingRestore.classId) && !isEmpty(pendingRestore.classId)) {
      return
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore])

  return null
}
