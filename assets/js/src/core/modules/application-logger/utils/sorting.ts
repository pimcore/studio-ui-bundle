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
 * Maps the grid column ids of the application logger table to the field names the
 * collection endpoint orders by. Every column marked as sortable needs an entry here,
 * otherwise its id would end up as an unknown column in the ORDER BY clause.
 */
export const APPLICATION_LOGGER_SORT_KEY_MAP: Record<string, string> = {
  date: 'timestamp',
  pid: 'pid',
  message: 'message',
  fileObject: 'fileobject',
  component: 'component',
  source: 'source'
}

export const DEFAULT_APPLICATION_LOGGER_SORT_FILTER: SortFilter = {
  key: 'id',
  direction: 'DESC'
}

export function mapSortingToSortFilter (sorting: SortingState): SortFilter {
  const column = sorting[0]

  if (isNil(column)) {
    return DEFAULT_APPLICATION_LOGGER_SORT_FILTER
  }

  const key = APPLICATION_LOGGER_SORT_KEY_MAP[column.id]

  if (isNil(key)) {
    return DEFAULT_APPLICATION_LOGGER_SORT_FILTER
  }

  return {
    key,
    direction: column.desc ? 'DESC' : 'ASC'
  }
}
