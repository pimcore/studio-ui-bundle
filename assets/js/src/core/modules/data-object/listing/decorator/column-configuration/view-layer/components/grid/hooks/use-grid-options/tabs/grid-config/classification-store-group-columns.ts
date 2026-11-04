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
  type ClassificationStoreGroupLayout2
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
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

/** The group and the key a classification store column is configured for. */
interface ClassificationStoreColumnConfig {
  groupId?: number
  keyId?: number
}

/** Of a key's layout definition, only the field type decides how its column renders. */
interface ClassificationStoreKeyDefinition {
  fieldtype?: string
}

/** The grid column a key of a group is shown as. */
const toColumn = (baseColumn: AvailableColumn, groupId: number, key: ClassificationStoreCollection2): AvailableColumn => ({
  ...baseColumn,
  frontendType: (key.definition as ClassificationStoreKeyDefinition).fieldtype,
  locale: baseColumn.localizable ? 'default' : undefined,
  config: {
    keyId: key.id,
    groupId,
    fieldDefinition: key.definition
  }
})

/** Whether the draft already holds a column of this field for that key of that group. */
const hasColumnForKey = (columns: AvailableColumn[], baseColumn: AvailableColumn, groupId: number, keyId: number): boolean =>
  columns.some((column) => {
    const config = column.config as ClassificationStoreColumnConfig

    return column.key === baseColumn.key && config.groupId === groupId && config.keyId === keyId
  })

/** Columns a selection adds to the draft: one per key picked on Group by Key, or one per key of each picked group, in layout order and without the keys the draft already shows. */
export const classificationStoreColumnsToAdd = (
  update: ClassificationStoreColumnUpdate,
  baseColumn: AvailableColumn,
  columns: AvailableColumn[]
): AvailableColumn[] => {
  if (update.type === TabId.GroupByKey) {
    return update.data.map((key) => toColumn(baseColumn, key.groupId, key))
  }

  return update.data.flatMap((group) => group.keys
    .filter((key) => !hasColumnForKey(columns, baseColumn, group.id, key.id))
    .map((key) => toColumn(baseColumn, group.id, key))
  )
}
