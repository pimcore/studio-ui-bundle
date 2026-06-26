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
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Data Object search listing. Selects the saved class first
 * (so its columns load) when one is set, then applies the saved search. A data-object search can be
 * classless (search across all classes), so routing is by elementType, not by the presence of a classId.
 */
export const ObjectSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const { setSelectedClassDefinition } = useClassDefinitionSelection()
  const { getById } = useClassDefinitions()
  const applySavedSearch = useApplySavedSearch()

  const classId = pendingRestore?.classId
  const hasClass = isString(classId) && !isEmpty(classId)
  const belongsToObject = !isNil(pendingRestore) && resolveSavedSearchElementType(pendingRestore) === elementTypes.dataObject

  // Select the saved class up front so the listing loads that class's columns.
  useEffect(() => {
    if (!belongsToObject || !hasClass) {
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
    // Wait for the available columns before applying, otherwise the saved column layout (and widths)
    // is dropped — useApplySavedSearch needs them to map the saved columns. This holds for classless
    // searches too: their system columns (type/fullpath/classname) are still available columns.
    if (!isEmpty(pendingRestore.columns) && isEmpty(availableColumns)) {
      return
    }

    applySavedSearch(pendingRestore)
    setPendingRestore(undefined)
  }, [pendingRestore, availableColumns])

  return null
}
