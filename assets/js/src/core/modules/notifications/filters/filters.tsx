/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type AnyFilterDescriptor,
  type FilterHostAdapter,
  createFiltersStore,
  defineFilter
} from '@Pimcore/components/filters'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import { transformDateFilter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/date-filter-transform'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import {
  type NotificationColumnFilter,
  type NotificationFilterColumn,
  type NotificationFilterContext,
  type NotificationFilterContribution,
  type NotificationFilterQuery
} from '@Pimcore/modules/notifications/filters/types'

export const NOTIFICATION_FILTERABLE_FIELDS: NotificationFilterColumn[] = [
  { key: 'title', translationKey: 'notifications.columns.title', type: 'like', frontendType: 'string' },
  { key: 'creationDate', translationKey: 'notifications.columns.date', type: 'date', frontendType: 'date' }
]

export const {
  FiltersStoreProvider: NotificationsAppliedFiltersProvider,
  useFiltersStore: useNotificationsAppliedFilters
} = createFiltersStore()

export const {
  FiltersStoreProvider: NotificationsDraftFiltersProvider,
  useFiltersStore: useNotificationsDraftFilters
} = createFiltersStore()

export const useNotificationsFilterContext = (): NotificationFilterContext => {
  const { getType } = useDynamicTypeResolver()

  return { columns: NOTIFICATION_FILTERABLE_FIELDS, getType }
}

const prepareFieldFilters = (filters: FieldFilter[], context: NotificationFilterContext): NotificationColumnFilter[] => {
  const { columns, getType } = context
  const preparedFilters: NotificationColumnFilter[] = []

  filters.forEach((filter) => {
    const column = columns.find((col) => col.key === filter.key)

    if (column === undefined) {
      return
    }

    let type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType] })

    if (type === null) {
      return
    }

    if (!(type instanceof DynamicTypeFieldFilterAbstract)) {
      if ('dynamicTypeFieldFilterType' in type) {
        type = type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
      } else {
        return
      }
    }

    const dynamicTypeFieldFilter = type as DynamicTypeFieldFilterAbstract

    if (!dynamicTypeFieldFilter.shouldApply(filter)) {
      return
    }

    if (dynamicTypeFieldFilter instanceof DynamicTypeFieldFilterDate) {
      transformDateFilter(filter.filterValue as DateValue).forEach((filterValue) => {
        preparedFilters.push({ key: column.key, type: column.type, filterValue })
      })
    } else {
      preparedFilters.push({ key: column.key, type: column.type, filterValue: String(filter.filterValue) })
    }
  })

  return preparedFilters
}

const fieldFiltersDescriptor = defineFilter<FieldFilter[], NotificationFilterContribution, NotificationFilterContext>({
  key: 'fieldFilters',
  defaultValue: [],
  section: 'fields',
  order: 10,
  isEnabled: () => true,
  toQuery: (value, context) => {
    if (value.length === 0) {
      return undefined
    }

    return { kind: 'columnFilters', filters: prepareFieldFilters(value, context) }
  }
})

export const notificationsFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<NotificationFilterContribution, NotificationFilterContext>> = [
  fieldFiltersDescriptor
]

export const notificationsFilterAdapter: FilterHostAdapter<NotificationFilterContribution, NotificationFilterContext, NotificationFilterQuery> = {
  descriptors: notificationsFilterDescriptors,
  useBuildContext: useNotificationsFilterContext,
  composeIntoQuery: (contributions, baseQuery) => {
    const next: NotificationFilterQuery = { ...baseQuery }
    const columnFilters: NotificationColumnFilter[] = []

    for (const contribution of contributions) {
      columnFilters.push(...contribution.filters)
    }

    if (columnFilters.length > 0) {
      next.columnFilters = columnFilters
    }

    return next
  }
}
