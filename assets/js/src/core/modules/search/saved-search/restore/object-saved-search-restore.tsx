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
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Data Object search listing. Selects the saved class first
 * (so its columns load), then applies the saved search once the available columns are ready.
 */
export const ObjectSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const { setSelectedClassDefinition } = useClassDefinitionSelection()
  const { getById } = useClassDefinitions()
  const applySavedSearch = useApplySavedSearch()

  const classId = pendingRestore?.classId
  const belongsToObject = isString(classId) && !isEmpty(classId)

  // Select the saved class up front so the listing loads that class's columns.
  useEffect(() => {
    if (isNil(pendingRestore) || !belongsToObject) {
      return
    }
    const classDefinition = getById(classId)
    if (!isNil(classDefinition)) {
      setSelectedClassDefinition(classDefinition)
    }
  }, [pendingRestore])

  useEffect(() => {
    if (isNil(pendingRestore) || !belongsToObject) {
      return
    }
    // Wait for the class's available columns before applying, otherwise the layout is dropped.
    if (!isEmpty(pendingRestore.columns) && isEmpty(availableColumns)) {
      return
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore, availableColumns])

  return null
}
