/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

/**
 * Resolves the dot-notation field name for the format-path API from the listing grid's
 * encoded column id. Matches the editor convention: localized fields use the
 * `localizedfields.` prefix (handled by the backend's LocalizedFieldResolver).
 */
export const useResolvedFieldName = (columnId: string | undefined, fallback: string | null | undefined): string | undefined => {
  const { decodeColumnIdentifier } = useSelectedColumns()

  return useMemo(() => {
    if (columnId !== undefined) {
      const column = decodeColumnIdentifier(columnId)
      if (column?.key !== undefined && column.key.length > 0) {
        if (column.localizable === true) {
          return `localizedfields.${column.key}`
        }
        return column.key
      }
    }
    return isNonEmptyString(fallback) ? fallback : undefined
  }, [columnId, decodeColumnIdentifier, fallback])
}
