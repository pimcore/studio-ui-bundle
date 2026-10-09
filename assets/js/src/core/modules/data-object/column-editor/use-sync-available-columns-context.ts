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
import { isEqual } from 'lodash'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'

/**
 * Publishes the column editor's own available-columns list (already fetched by
 * `useColumnEditorState`) into the ambient `AvailableColumnsContext` that `BaseColumnEditor` wraps
 * its tree with. Mirrors what Studio's own listing grid configuration does in its
 * `ColumnConfigLoader` (`setAvailableColumns` from the same available-columns query response).
 *
 * Without this, `AvailableColumnsContext` stays empty inside BaseColumnEditor, and any pipeline
 * source-field/transformer component that reads it to group its options by `column.group` - today
 * that's just the "Simple field" source
 * (`DynamicTypePipelineGridSourceFieldsSimpleFieldComponent`) - falls back to an ungrouped flat
 * list instead of the "Attributes / attributes / Bodywork"-style grouping the listing grid config
 * shows for the same fields.
 *
 * Must be called from a component rendered inside `BaseColumnEditor`'s `AvailableColumnsProvider`.
 */
export const useSyncAvailableColumnsContext = (availableFields: GridColumnConfiguration[]): void => {
  const { setAvailableColumns } = useAvailableColumns()

  const lastPublished = useRef<GridColumnConfiguration[] | null>(null)

  // Publishes every result, including an empty one: a class without columns (or a switch to a
  // different class) must replace the previous class's list instead of leaving it stale. Compared
  // by content against the last published list, so a list that only changes identity between
  // renders (an unstable `data?.columns ?? []`) can never re-trigger this effect in a loop.
  useEffect(() => {
    if (lastPublished.current !== null && isEqual(lastPublished.current, availableFields)) {
      return
    }

    lastPublished.current = availableFields
    setAvailableColumns(availableFields)
  }, [availableFields])
}
