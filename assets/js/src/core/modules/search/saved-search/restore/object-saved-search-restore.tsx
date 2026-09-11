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
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { restoredColumnKeys, useApplySavedSearch } from './use-apply-saved-search'

/**
 * Logic-only component mounted inside the Data Object search listing. Selects the saved class first
 * (so its columns load) when one is set, then applies the saved search. A data-object search can be
 * classless (search across all classes), so routing is by elementType, not by the presence of a classId.
 */
export const ObjectSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const { selectedColumns } = useSelectedColumns()
  const { selectedClassDefinition, setSelectedClassDefinition } = useClassDefinitionSelection()
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
    // A class-scoped search restores against ITS class's columns. Until the class selection
    // has taken effect, the available columns are the classless static set — the saved columns
    // map to almost nothing against them, and a restore applied there "matches" that reduced
    // set and consumes itself before the class columns ever arrive.
    if (hasClass && selectedClassDefinition?.id !== classId) {
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
  }, [pendingRestore, availableColumns, selectedColumns, selectedClassDefinition])

  return null
}
