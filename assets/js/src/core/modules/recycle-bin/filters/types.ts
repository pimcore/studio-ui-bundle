/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UseDynamicTypeResolverReturnType } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { DateFilterOperator } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/date-filter-transform'

export interface RecycleBinDateFilterValue {
  operator: DateFilterOperator
  value: string
}

export interface RecycleBinColumnFilter {
  key: string
  type: string
  filterValue: string | RecycleBinDateFilterValue
}

export interface RecycleBinFilterColumn {
  key: string
  translationKey: string
  type: string
  frontendType: string
}

export type RecycleBinFilterContribution =
    | { kind: 'columnFilters', filters: RecycleBinColumnFilter[] }

export interface RecycleBinFilterContext {
  columns: RecycleBinFilterColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
}

export interface RecycleBinFilterQuery {
  columnFilters?: RecycleBinColumnFilter[]
}
