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

const withLocalizedfieldsLeaf = (parts: string[], localized: boolean): string => {
  return localized ? [...parts.slice(0, -1), 'localizedfields', parts[parts.length - 1]].join('.') : parts.join('.')
}

/**
 * Resolves the dot-notation field name for the format-path API from the
 * listing grid's decoded SelectedColumn.
 *
 * - dataobject.adapter columns are keyed by column.key.
 * - dataobject.objectbrick columns expose the segments explicitly via
 *   column.config.{field, objectBrick, attribute} (see PHP ObjectBrickCollector).
 * - Localizable columns get `localizedfields` inserted before the leaf segment,
 *   matching the backend's DotNotationParser resolvers.
 * - Other column types (notably dataobject.classificationstore) have no
 *   matching backend resolver — return undefined so the caller skips the call.
 */
export const useResolvedFieldName = (columnId: string | undefined, fallback: string | null | undefined): string | undefined => {
  const { decodeColumnIdentifier } = useSelectedColumns()

  return useMemo(() => {
    if (columnId !== undefined) {
      const column = decodeColumnIdentifier(columnId)
      if (column !== undefined) {
        if (column.type === OBJECTBRICK_COLUMN_TYPE) {
          const cfg = column.config ?? {}
          const field = cfg.field
          const objectBrick = cfg.objectBrick
          const attribute = cfg.attribute
          if (isNonEmptyString(field) && isNonEmptyString(objectBrick) && isNonEmptyString(attribute)) {
            return withLocalizedfieldsLeaf([field, objectBrick, attribute], column.localizable)
          }
          return undefined
        }

        if (column.type === ADAPTER_COLUMN_TYPE && isNonEmptyString(column.key)) {
          return withLocalizedfieldsLeaf([column.key], column.localizable)
        }

        return undefined
      }
    }
    return isNonEmptyString(fallback) ? fallback : undefined
  }, [columnId, decodeColumnIdentifier, fallback])
}
