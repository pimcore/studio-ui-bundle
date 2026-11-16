/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type ClassificationStoreCollection2,
  type ClassificationStoreGroupLayout2,
  type ClassificationStoreVariantLayout
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { declaredVariantsOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-slots'
import { multiValueMembersOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/utils/multi-value-members'
import { variantNameOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-name'
import { isRepeatingColumn, variantSlotsOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-column'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

/** A key picked on the Group by Key tab: the layout of the key, plus the group it was picked in. */
export interface ClassificationStoreKeySelection extends ClassificationStoreCollection2 {
  groupId: number
}

/** What the Group tab reports back: the layout of every group that was picked. */
export interface ClassificationStoreGroupUpdate {
  type: TabId.Group
  data: ClassificationStoreGroupLayout2[]
}

/** What the Group by Key tab reports back: every key that was picked. */
export interface ClassificationStoreGroupByKeyUpdate {
  type: TabId.GroupByKey
  data: ClassificationStoreKeySelection[]
}

/** What the classification store modal reports back when a selection is applied. */
export type ClassificationStoreColumnUpdate = ClassificationStoreGroupUpdate | ClassificationStoreGroupByKeyUpdate

/** The group, the key and the variant a classification store column is configured for. */
interface ClassificationStoreColumnConfig {
  groupId?: number
  keyId?: number
  variant?: string | null
}

/** Of a key's layout definition, only the field type decides how its column renders. */
interface ClassificationStoreKeyDefinition {
  fieldtype?: string
}

/** The grid column a key of a group is shown as; a variant of a `multiValue` key is a column of its own. */
const toColumn = (
  baseColumn: AvailableColumn,
  groupId: number,
  key: ClassificationStoreCollection2,
  variant: ClassificationStoreVariantLayout | null
): AvailableColumn => {
  // The layout publishes `multiValue` on the key itself; merge it so a response that omits it from `definition` still marks a repeating key.
  const definition = { ...key.definition, ...multiValueMembersOf(key) }
  const config = {
    keyId: key.id,
    groupId,
    // `variant: null` addresses the default slot; a column without the member would be expanded by the backend.
    variant: variant === null ? null : variantNameOf(variant),
    fieldDefinition: variant === null ? definition : { ...definition, variants: declaredVariantsOf(key.variants) }
  }

  return {
    ...baseColumn,
    // A repeating key is displayed only: its cell value is a list that neither inline edit nor batch edit writes.
    editable: baseColumn.editable && !isRepeatingColumn({ config }),
    frontendType: (key.definition as ClassificationStoreKeyDefinition).fieldtype,
    locale: baseColumn.localizable ? 'default' : undefined,
    config
  }
}

/** Whether the draft already holds a column of this field for that key of that group, in that variant. */
const hasColumnForKey = (columns: AvailableColumn[], baseColumn: AvailableColumn, groupId: number, keyId: number, variant: string | null): boolean =>
  columns.some((column) => {
    const config = column.config as ClassificationStoreColumnConfig

    return column.key === baseColumn.key && config.groupId === groupId && config.keyId === keyId && (config.variant ?? null) === variant
  })

/** The columns one key is shown as: one per declared variant in declaration order, then the default slot. */
const columnsOfKey = (
  baseColumn: AvailableColumn,
  groupId: number,
  key: ClassificationStoreCollection2,
  columns: AvailableColumn[]
): AvailableColumn[] => {
  return variantSlotsOf(key.variants)
    .filter((variant) => !hasColumnForKey(columns, baseColumn, groupId, key.id, variant === null ? null : variantNameOf(variant)))
    .map((variant) => toColumn(baseColumn, groupId, key, variant))
}

/** Columns a selection adds to the draft: one per slot of each key picked on Group by Key or of each picked group, in layout order and without the slots the draft already shows. */
export const classificationStoreColumnsToAdd = (
  update: ClassificationStoreColumnUpdate,
  baseColumn: AvailableColumn,
  columns: AvailableColumn[]
): AvailableColumn[] => {
  if (update.type === TabId.GroupByKey) {
    return update.data.flatMap((key) => columnsOfKey(baseColumn, key.groupId, key, columns))
  }

  return update.data.flatMap((group) => group.keys.flatMap((key) => columnsOfKey(baseColumn, group.id, key, columns)))
}
