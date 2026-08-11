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
import { useTranslation } from 'react-i18next'
import { type ColumnDef } from '@tanstack/react-table'
import { isNil } from 'lodash'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import type { RelationFilterColumn } from '../types'
import { getFilterColumnCandidates } from '../utils/filter-columns'
import { canMatchFieldFilterType, getColumnFieldType, resolveFieldFilterType } from '../utils/row-matchers'

export interface UseFilterableColumnsProps {
  enabled: boolean
  columnDefinition?: Array<ColumnDef<any>>
}

/**
 * The columns that offer a filter. A column is filterable when its type
 * resolves to a field filter that can be evaluated against the rows in memory -
 * the registries decide, not a list of known field types.
 */
export const useFilterableColumns = ({ enabled, columnDefinition }: UseFilterableColumnsProps): RelationFilterColumn[] => {
  const { t } = useTranslation()
  const { getType } = useDynamicTypeResolver()
  const { selectedColumns, decodeColumnIdentifier } = useSelectedColumns()

  return useMemo(() => {
    if (!enabled) {
      return []
    }

    const candidates = getFilterColumnCandidates(columnDefinition, t, (columnId) => decodeColumnIdentifier(columnId))

    return candidates.filter((column) => {
      const dynamicTypeFieldFilter = resolveFieldFilterType(getType, column)

      if (isNil(dynamicTypeFieldFilter) || !dynamicTypeFieldFilter.isFilterAvailable(getColumnFieldType(column))) {
        return false
      }

      return canMatchFieldFilterType(dynamicTypeFieldFilter.getFieldFilterType())
    })
  }, [enabled, columnDefinition, selectedColumns, t])
}
