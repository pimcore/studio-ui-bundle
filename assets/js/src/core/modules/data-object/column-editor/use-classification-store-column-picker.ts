/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'
import { CLASSIFICATION_STORE_COLUMN_TYPE, getColumnIdentity, type AdvancedEditorColumn } from './types'

interface PickedClassificationStoreItem {
  id: number
  groupId: number
  name?: string
  groupName?: string
  definition?: { fieldtype?: string }
}

export interface UseClassificationStoreColumnPickerParams {
  /** The resolved class id the picked group/key relations are scoped to. */
  resolvedClassId?: string
  /** Fallback class id while `resolvedClassId` is still resolving. */
  entity: string
  draft: AdvancedEditorColumn[]
  handleAddColumnOfType: (column: GridColumnConfiguration) => void
}

export interface UseClassificationStoreColumnPickerResult {
  /**
   * Wraps `handleAddColumnOfType`: picking a classification store column (the container field
   * entry, e.g. `technicalAttributes`) opens the same group/key picker Studio's own grid
   * configuration uses instead of adding the container field directly, and adds one column per
   * selected key. Any other column is added as-is.
   */
  handleColumnPick: (column: GridColumnConfiguration) => void
}

/**
 * Mirrors the Studio listing grid configuration's own `onColumnClick`/`onClassificationStoreUpdate`
 * (`grid-config-inner.tsx`) so a classification store column added through {@see BaseColumnEditor}
 * ends up with the exact same column shape: one column per picked key, keyed by the container
 * field's own `key`, with `config: { groupId, keyId, fieldDefinition }` (`groupName` is additionally
 * recorded for the "group › key" display label - see `getClassificationStoreColumnLabel`). Already
 * picked group/key combinations are skipped rather than added twice.
 */
export const useClassificationStoreColumnPicker = (
  { resolvedClassId, entity, draft, handleAddColumnOfType }: UseClassificationStoreColumnPickerParams
): UseClassificationStoreColumnPickerResult => {
  const pendingColumnRef = useRef<GridColumnConfiguration | undefined>(undefined)

  const onColumnsPicked = (data: { type: TabId, data: PickedClassificationStoreItem[] }): void => {
    const baseColumn = pendingColumnRef.current
    pendingColumnRef.current = undefined

    if (baseColumn === undefined || data.type !== TabId.GroupByKey) {
      return
    }

    const existingIdentities = new Set(
      draft
        .filter(col => col.type === CLASSIFICATION_STORE_COLUMN_TYPE)
        .map(col => getColumnIdentity(col))
    )

    data.data.forEach((item) => {
      const identity = getColumnIdentity({
        key: baseColumn.key,
        type: baseColumn.type,
        config: { groupId: item.groupId, keyId: item.id }
      })

      if (existingIdentities.has(identity)) {
        return
      }
      existingIdentities.add(identity)

      handleAddColumnOfType({
        ...baseColumn,
        frontendType: item.definition?.fieldtype,
        // A column with no locale of its own already follows the consumer's own render/grid
        // locale (see e.g. Output Channels' `OutputChannelExtractor`, which falls the column's
        // locale back to the render locale and, for a genuinely non-localized store, relies on
        // `Classificationstore::getLocalizedKeyValue()`'s own "no value in this bucket -> read the
        // default bucket" fallback) - so the locale is deliberately left unset here for every
        // classification store column, localizable or not, rather than hardcoding the store's
        // internal "default" bucket name into the saved column.
        locale: undefined,
        config: {
          keyId: item.id,
          groupId: item.groupId,
          fieldDefinition: item.definition,
          groupName: item.groupName
        }
      })
    })
  }

  const { openModal } = useClassificationStoreModal({ onUpdate: onColumnsPicked })

  const handleColumnPick = (column: GridColumnConfiguration): void => {
    if (column.type !== CLASSIFICATION_STORE_COLUMN_TYPE || !hasFieldDefinition(column.config)) {
      handleAddColumnOfType(column)
      return
    }

    const fieldDefinition = column.config.fieldDefinition as { storeId: number, name: string }
    pendingColumnRef.current = column

    openModal({
      storeId: fieldDefinition.storeId,
      classId: resolvedClassId ?? entity,
      fieldName: fieldDefinition.name,
      name: fieldDefinition.name,
      allowedTabs: [TabId.GroupByKey]
    })
  }

  return { handleColumnPick }
}
