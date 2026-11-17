/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SortingState } from '@tanstack/react-table'
import { type SortFilter } from '@Pimcore/modules/app/types/sort-filter'
import { isNil } from 'lodash'

/**
 * Maps the grid column ids of the recycle bin table to the field names the collection
 * endpoint orders by. Lowercased multi-word keys (e.g. `deletedby`) match the field names
 * already used by RECYCLE_BIN_FILTERABLE_FIELDS in ../filters/filters.tsx.
 */
export const RECYCLE_BIN_SORT_KEY_MAP: Record<string, string> = {
  type: 'type',
  path: 'path',
  amount: 'amount',
  deletedBy: 'deletedby',
  date: 'date'
}

export const DEFAULT_RECYCLE_BIN_SORT_FILTER: SortFilter = {
  key: 'id',
  direction: 'DESC'
}

export const mapSortingToSortFilter = (sorting: SortingState): SortFilter => {
  const column = sorting[0]

  if (isNil(column)) {
    return DEFAULT_RECYCLE_BIN_SORT_FILTER
  }

  const key = RECYCLE_BIN_SORT_KEY_MAP[column.id]

  if (isNil(key)) {
    return DEFAULT_RECYCLE_BIN_SORT_FILTER
  }

  return {
    key,
    direction: column.desc ? 'DESC' : 'ASC'
  }
}
