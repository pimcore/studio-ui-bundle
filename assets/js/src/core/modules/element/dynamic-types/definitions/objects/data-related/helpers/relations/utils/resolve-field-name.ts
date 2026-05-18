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

const ADAPTER_COLUMN_TYPE = 'dataobject.adapter'
const OBJECTBRICK_COLUMN_TYPE = 'dataobject.objectbrick'

const toDotPath = (parts: string[]): string => parts.join('.')

const toLocalizedDotPath = (parts: string[]): string => {
  const leaf = parts.at(-1) ?? ''
  return toDotPath([...parts.slice(0, -1), 'localizedfields', leaf])
}

/**
 * Builds the dot-notation field name expected by the format-path API.
 *
 * Object brick segments are read from column.config so we don't depend on the
 * column.key string shape. Localizable columns insert `localizedfields` before
 * the leaf to match the backend's DotNotationParser resolvers. Unknown column
 * types (e.g. classificationstore — no matching resolver) return undefined so
 * the caller skips the API call.
 */
export const useResolvedFieldName = (columnId: string | undefined, fallback: string | null | undefined): string | undefined => {
  const { decodeColumnIdentifier } = useSelectedColumns()

  return useMemo(() => {
    if (columnId !== undefined) {
      const column = decodeColumnIdentifier(columnId)
      if (column !== undefined) {
        if (column.type === OBJECTBRICK_COLUMN_TYPE) {
          const { field, objectBrick, attribute } = column.config ?? {}
          if (isNonEmptyString(field) && isNonEmptyString(objectBrick) && isNonEmptyString(attribute)) {
            const parts = [field, objectBrick, attribute]
            return column.localizable ? toLocalizedDotPath(parts) : toDotPath(parts)
          }
          return undefined
        }

        if (column.type === ADAPTER_COLUMN_TYPE && isNonEmptyString(column.key)) {
          return column.localizable ? toLocalizedDotPath([column.key]) : toDotPath([column.key])
        }

        return undefined
      }
    }
    return isNonEmptyString(fallback) ? fallback : undefined
  }, [columnId, decodeColumnIdentifier, fallback])
}
