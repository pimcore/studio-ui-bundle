/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { isEmpty, isNil, isString } from 'lodash'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import { useApplySavedSearch } from './use-apply-saved-search'
import { carriesLayout, restoredColumnLayout } from './restored-layout'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useDataObjectGetAvailableGridColumnsQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'

/**
 * Logic-only component mounted inside the Data Object search listing. Selects the saved class first
 * (so its columns load) when one is set, then applies the saved search. A data-object search can be
 * classless (search across all classes), so routing is by elementType, not by the presence of a classId.
 */
export const ObjectSavedSearchRestore = (): null => {
  const { pendingRestore, setPendingRestore } = useSearch()
  const { availableColumns } = useAvailableColumns()
  const { selectedColumns } = useSelectedColumns()
  const { selectedClassDefinition, setSelectedClassDefinition, availableClassDefinitions } = useClassDefinitionSelection()
  const { getById, data: classCatalog } = useClassDefinitions()
  // the proposal this restore has already applied at least once
  const appliedTo = useRef<unknown>(undefined)
  const applySavedSearch = useApplySavedSearch()
  const { getId } = useSettings().useElementId()

  const classId = pendingRestore?.classId
  const hasClass = isString(classId) && !isEmpty(classId)
  // a class deleted since the search was saved can never be selected: once the catalog has loaded
  // without it, the search restores classless — as it did before it waited for its class
  const scopedToClass = hasClass && (isNil(classCatalog) || !isNil(getById(classId)))
  // restoring classless means no class selected — except in a listing offering a single class,
  // which always shows that one and has no classless state
  const staleClassSelected = hasClass && !scopedToClass && !isNil(selectedClassDefinition) &&
    availableClassDefinitions.length !== 1
  const belongsToObject = !isNil(pendingRestore) && resolveSavedSearchElementType(pendingRestore) === elementTypes.dataObject
  // the same query the class column loader runs, so this reads its cache entry rather than a second request
  const { currentData: classColumns } = useDataObjectGetAvailableGridColumnsQuery(
    { folderId: getId(), classId: classId! },
    { skip: !belongsToObject || !scopedToClass }
  )

  // Select the saved class up front so the listing loads that class's columns. Depends on the
  // class catalog as well: mounted while it still loads, a one-shot lookup misses and the
  // restore would hang at the class gate below forever — and on the selected class, which the
  // user can change before the restore is consumed.
  useEffect(() => {
    if (!belongsToObject || !hasClass) {
      return
    }
    if (staleClassSelected) {
      setSelectedClassDefinition(undefined)
      return
    }
    const classDefinition = getById(classId)
    if (!isNil(classDefinition) && selectedClassDefinition?.id !== classId) {
      setSelectedClassDefinition(classDefinition)
    }
  }, [pendingRestore, classCatalog, selectedClassDefinition?.id, staleClassSelected])

  useEffect(() => {
    // a host may hand the same configuration object back later: it has to apply again
    if (isNil(pendingRestore)) {
      appliedTo.current = undefined
      return
    }
    if (!belongsToObject) {
      return
    }
    // A class-scoped search restores against ITS class's columns. Until the class selection
    // has taken effect, the available columns are the classless static set — the saved columns
    // map to almost nothing against them, and a restore applied there "matches" that reduced
    // set and consumes itself before the class columns ever arrive.
    if ((scopedToClass && selectedClassDefinition?.id !== classId) || staleClassSelected) {
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
    // A search carries more than columns — its filter, its type select, its page size — so
    // "the grid already shows the saved columns" cannot stand in for "applied" until it has
    // been applied once. A search that names NO columns matches that test on the first tick,
    // and without this it would be consumed having applied nothing at all.
    const expected = restoredColumnLayout(savedColumns, availableColumns)
    const columnsCarried = isEmpty(expected) || carriesLayout(selectedColumns, expected)
    if (appliedTo.current !== pendingRestore || !columnsCarried) {
      appliedTo.current = pendingRestore
      applySavedSearch(pendingRestore)

      // a column update still to land re-runs this effect; a layout already carried gives it
      // nothing to wait for, so it goes on to schedule the consumption
      if (!columnsCarried) {
        return
      }
    }

    // The class column set loads after the class selection — and after the type select, which
    // the apply itself restores. Until the listing carries exactly what the class query returned,
    // the match above only covers the classless set: applied, but not yet consumable. When the
    // class columns arrive the expectation widens and the columns re-apply.
    const classColumnKeys = (classColumns?.columns ?? []).map((column) => column.key)
    const classColumnsLoaded = !isNil(classColumns?.columns) &&
      classColumnKeys.length === availableColumns.length &&
      classColumnKeys.every((key, index) => availableColumns[index]?.key === key)
    if (scopedToClass && !classColumnsLoaded) {
      return
    }

    // Consume only after the applied state has HELD briefly: on a cold open the column
    // configuration loaders are still landing, and one of them can overwrite the applied
    // columns right after a match — consuming on first sight would leave that uncorrected.
    const timer = window.setTimeout(() => {
      setPendingRestore(undefined)
    }, 1200)

    return () => { window.clearTimeout(timer) }
  }, [pendingRestore, availableColumns, selectedColumns, selectedClassDefinition, classColumns, scopedToClass, staleClassSelected])

  return null
}
