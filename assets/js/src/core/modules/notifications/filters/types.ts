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

export interface NotificationDateFilterValue {
  operator: DateFilterOperator
  value: string
}

export interface NotificationColumnFilter {
  key: string
  type: string
  filterValue: string | NotificationDateFilterValue
}

export interface NotificationFilterColumn {
  key: string
  translationKey: string
  type: string
  frontendType: string
}

export type NotificationFilterContribution =
    | { kind: 'columnFilters', filters: NotificationColumnFilter[] }

export interface NotificationFilterContext {
  columns: NotificationFilterColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
}

export interface NotificationFilterQuery {
  columnFilters?: NotificationColumnFilter[]
}
