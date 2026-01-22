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
import { type SortFilter } from '../types/sort-filter'
import { isNil } from 'lodash'

export function transformToSortingState (sortFilter: SortFilter): SortingState {
  return [{
    id: sortFilter.key,
    desc: sortFilter.direction === 'DESC'
  }]
}

export function transformToSortFilter (sorting: SortingState | null): SortFilter | null {
  if (isNil(sorting) || sorting.length === 0) {
    return null
  }

  return {
    key: sorting[0].id,
    direction: sorting[0].desc ? 'DESC' : 'ASC'
  }
}
