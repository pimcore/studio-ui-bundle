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

const OBJECTBRICK_COLUMN_TYPE = 'dataobject.objectbrick'

const withLocalizedfieldsLeaf = (parts: string[], localized: boolean): string => {
  return localized ? [...parts.slice(0, -1), 'localizedfields', parts[parts.length - 1]].join('.') : parts.join('.')
}

/**
 * Resolves the dot-notation field name for the format-path API from the
 * listing grid's decoded SelectedColumn.
 *
 * - dataobject.objectbrick columns expose the segments explicitly via
 *   column.config.{field, objectBrick, attribute} (see PHP ObjectBrickCollector).
 * - All other relation columns are top-level fields keyed by column.key.
 * - Localizable columns get `localizedfields` inserted before the leaf segment,
 *   matching the backend's DotNotationParser resolvers.
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
            return withLocalizedfieldsLeaf([field, objectBrick, attribute], column.localizable === true)
          }
        }

        if (isNonEmptyString(column.key)) {
          return withLocalizedfieldsLeaf([column.key], column.localizable === true)
        }
      }
    }
    return isNonEmptyString(fallback) ? fallback : undefined
  }, [columnId, decodeColumnIdentifier, fallback])
}
