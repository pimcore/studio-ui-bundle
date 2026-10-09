/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { ADVANCED_COLUMN_KEY, ADVANCED_COLUMN_TYPE, SYSTEM_COLUMN_FIELDTYPE } from './types'

/**
 * True for any column the backend's `SystemFieldCollector` produced (`id`, `fullpath`, `published`,
 * `creationDate`, ...): they are always grouped under the literal `'system'` segment
 * (`SystemFieldCollector::getTypeName()`), whatever their individual `type`/`key`. `group` may be a
 * flat array, a nested array of arrays (a column filed under more than one group), or - defensively
 * - a bare string; see `useAddColumnGroups`' own normalization for the same shape.
 */
const isSystemColumn = (column: GridColumnConfiguration): boolean => {
  const group = column.group as unknown

  if (Array.isArray(group)) {
    return group.some((segment) => segment === 'system' || (Array.isArray(segment) && segment[0] === 'system'))
  }

  return group === 'system'
}

/**
 * Resolves the real Pimcore field type (e.g. `input`, `numeric`, `select`) a freshly added column
 * should be persisted with, mirroring the derivation `withAdvancedColumnConfig` already uses for
 * grid columns: `column.config?.fieldDefinition?.fieldtype ?? column.frontendType`. Two shapes need
 * a fixed sentinel instead, matching what Data Hub's own export adapters already expect on disk
 * (see `data-hub-file-export`'s `UpdateConfiguration` schema example and
 * `data-hub-simple-rest`'s `DataObjectMappingAndDataExtractor`):
 * - the advanced/pipeline column, whose key is always the literal `ADVANCED_COLUMN_KEY` at
 *   add-time (the user-defined title is only known once the pipeline form is filled in), and
 * - system columns (`id`, `fullpath`, ...), which both adapters filter/format by the literal
 *   string `'system'`, not by `column.type` (e.g. `system.id`) or the column key.
 */
export const resolveFieldtype = (column: GridColumnConfiguration): string => {
  if (column.type === ADVANCED_COLUMN_TYPE || column.key === ADVANCED_COLUMN_KEY) {
    return ADVANCED_COLUMN_KEY
  }

  if (isSystemColumn(column)) {
    return SYSTEM_COLUMN_FIELDTYPE
  }

  const config = column.config as { fieldDefinition?: { fieldtype?: string } } | undefined

  return config?.fieldDefinition?.fieldtype ?? column.frontendType ?? column.type
}
