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
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Data Object search listing. When a saved search with a
 * `classId` is pending, it selects that class and applies the saved search to this listing's state.
 */
export const ObjectSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const applySavedSearch = useApplySavedSearch()
  const { setSelectedClassDefinition } = useClassDefinitionSelection()
  const { getById } = useClassDefinitions()

  useEffect(() => {
    if (isNil(pendingRestore)) {
      return
    }
    const classId = pendingRestore.classId
    // No classId means this is an asset search — let the asset applier handle it.
    if (!isString(classId) || isEmpty(classId)) {
      return
    }

    const classDefinition = getById(classId)
    if (!isNil(classDefinition)) {
      setSelectedClassDefinition(classDefinition)
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore])

  return null
}
