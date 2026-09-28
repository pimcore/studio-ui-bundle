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

  useEffect(() => {
    // Guards the same way useColumnEditorState's own "hydrate from availableFields" effect does:
    // skips a still-loading (or genuinely columnless) result rather than publishing an empty list.
    // Beyond avoiding a no-op update, this matters because `availableFields` has no stable identity
    // while the underlying query result is undefined (`data?.columns ?? []` mints a fresh array each
    // render) - publishing it unconditionally would re-trigger this same effect on every render and
    // loop.
    if (availableFields.length === 0) {
      return
    }

    setAvailableColumns(availableFields)
  }, [availableFields])
}
