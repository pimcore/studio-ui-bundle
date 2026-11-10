/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

/**
 * Combines the static search columns with the asset grid columns from the API (system and
 * metadata), so metadata can be picked as a filter. API definitions win over static ones for
 * the same key; static columns stay as fallback while the API columns are not loaded.
 */
export const mergeAvailableColumns = (staticColumns: AvailableColumn[], apiColumns: AvailableColumn[] | undefined): AvailableColumn[] => {
  if (apiColumns === undefined) {
    return staticColumns
  }

  const apiColumnKeys = new Set(apiColumns.map((column) => column.key))

  return [
    ...staticColumns.filter((column) => !apiColumnKeys.has(column.key)),
    ...apiColumns
  ]
}
