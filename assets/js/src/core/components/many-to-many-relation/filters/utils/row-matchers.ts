/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import dayjs from 'dayjs'
import { isArray, isBoolean, isNil, isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { FieldFilterFrontendType } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/frontendTypes'
import type { NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import type { DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import { DateFilterOperator, transformDateFilter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/date-filter-transform'
import { NumberFilterOperator, transformNumberFilter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/number-filter-transform'
import type { UseDynamicTypeResolverReturnType } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { flattenValues } from '../../utils/helpers'
import type { RelationFilterColumn, RelationFilterContext, RelationRowMatcher } from '../types'
import { resolveRowValue } from './filter-columns'

/** The field type a column carries, as the filter editors read it. */
export const getColumnFieldType = (column: RelationFilterColumn): string => {
  const fieldDefinition = column.config?.fieldDefinition

  return String(fieldDefinition?.fieldType ?? fieldDefinition?.fieldtype ?? column.frontendType ?? column.type)
}

/** Every object data type declares the field filter it is filtered with. */
const getObjectDataFieldFilterType = (fieldType: string): DynamicTypeFieldFilterAbstract | undefined => {
  const objectDataRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  if (!objectDataRegistry.hasDynamicType(fieldType)) {
    return undefined
  }

  return objectDataRegistry.getDynamicType(fieldType).dynamicTypeFieldFilterType
}

/**
 * Resolves the field filter of a column from the registries - the same
 * resolution the listing does when it renders a field filter. Adapter types
 * (data object, object brick, classification store) delegate to the field type
 * of the column, object data types declare their filter themselves.
 */
export const resolveFieldFilterType = (
  getType: UseDynamicTypeResolverReturnType['getType'],
  column: RelationFilterColumn
): DynamicTypeFieldFilterAbstract | undefined => {
  const fieldType = getColumnFieldType(column)
  const type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType ?? '', fieldType] })

  if (isNil(type)) {
    return getObjectDataFieldFilterType(fieldType)
  }

  if ('dynamicTypeFieldFilterType' in type) {
    return type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
  }

  if (!(type instanceof DynamicTypeFieldFilterAbstract)) {
    return undefined
  }

  return type.shouldOverrideFilterType() ? getObjectDataFieldFilterType(fieldType) : type
}

/**
 * The conditions a filter value implies are produced by the shared transforms
 * of the field filters - only the comparison itself lives here, because the
 * filters are evaluated against the rows in memory instead of a backend query.
 */
const matchesNumber = (value: unknown, filterValue: NumberValue): boolean => {
  const numericValue = Number(value)

  if (isNil(value) || value === '' || isNaN(numericValue)) {
    return false
  }

  return transformNumberFilter(filterValue).every((condition) => {
    switch (condition.operator) {
      case NumberFilterOperator.LessThan:
        return numericValue < condition.value

      case NumberFilterOperator.GreaterThan:
        return numericValue > condition.value

      case NumberFilterOperator.From:
        return numericValue >= condition.value

      case NumberFilterOperator.To:
        return numericValue <= condition.value

      default:
        return numericValue === condition.value
    }
  })
}

/** Grid dates are unix timestamps, filter values ISO strings - both compare by calendar day. */
const toCalendarDay = (value: unknown): string | undefined => {
  if (isNil(value) || value === '') {
    return undefined
  }

  const numericValue = Number(value)
  const date = isNaN(numericValue) ? dayjs(String(value)) : dayjs.unix(numericValue)

  return date.isValid() ? date.format('YYYY-MM-DD') : undefined
}

const matchesDate = (value: unknown, filterValue: DateValue): boolean => {
  const day = toCalendarDay(value)

  if (isUndefined(day)) {
    return false
  }

  return transformDateFilter(filterValue).every((condition) => {
    // The conditions carry ISO strings, the calendar day prefix is enough here.
    const conditionDay = condition.value.slice(0, 10)

    if (conditionDay === '') {
      return true
    }

    switch (condition.operator) {
      case DateFilterOperator.From:
        return day >= conditionDay

      case DateFilterOperator.To:
        return day <= conditionDay

      default:
        return day === conditionDay
    }
  })
}

/** `null` is the empty selection of the boolean filter, matching empty values. */
const toBooleanValue = (value: unknown): boolean | null => {
  if (isNil(value) || value === '') {
    return null
  }

  if (isBoolean(value)) {
    return value
  }

  const normalizedValue = String(value).toLowerCase()

  if (normalizedValue === 'true' || normalizedValue === '1') {
    return true
  }

  if (normalizedValue === 'false' || normalizedValue === '0') {
    return false
  }

  return null
}

const matchesBoolean = (value: unknown, filterValue: unknown): boolean => {
  const selection = isArray(filterValue) ? filterValue : [filterValue]

  return selection.some((entry) => toBooleanValue(entry) === toBooleanValue(value))
}

const matchesSelection = (value: unknown, filterValue: unknown[]): boolean => {
  const selection = filterValue.map(String)

  if (isArray(value)) {
    return value.some((entry) => selection.includes(String(entry)))
  }

  return !isNil(value) && selection.includes(String(value))
}

const matchesText = (value: unknown, filterValue: unknown): boolean => {
  const searchTerm = String(filterValue).toLowerCase()

  return flattenValues(value).some((entry) => entry.toLowerCase().includes(searchTerm))
}

/**
 * The filter types that can be evaluated against the rows in memory. A column
 * whose filter type is missing here - a relation, a quantity value, a
 * classification store, … - offers no filter at all.
 */
const VALUE_MATCHERS: Record<string, (value: unknown, filterValue: any) => boolean> = {
  [FieldFilterFrontendType.Number]: matchesNumber,
  [FieldFilterFrontendType.Date]: matchesDate,
  [FieldFilterFrontendType.DateTime]: matchesDate,
  [FieldFilterFrontendType.Boolean]: matchesBoolean,
  [FieldFilterFrontendType.String]: (value, filterValue) => isArray(filterValue)
    ? matchesSelection(value, filterValue)
    : matchesText(value, filterValue)
}

export const canMatchFieldFilterType = (fieldFilterType: string): boolean => {
  return !isUndefined(VALUE_MATCHERS[fieldFilterType])
}

/**
 * Turns the stored column filters into row matchers. Filters of columns that
 * are gone, or that carry no value, contribute nothing.
 */
export const createRowMatchers = (filters: FieldFilter[], context: RelationFilterContext): RelationRowMatcher[] => {
  const matchers: RelationRowMatcher[] = []

  for (const filter of filters) {
    const column = context.columns.find((candidate) => candidate.key === filter.key)

    if (isNil(column)) {
      continue
    }

    const dynamicTypeFieldFilter = resolveFieldFilterType(context.getType, column)

    if (isNil(dynamicTypeFieldFilter) || !dynamicTypeFieldFilter.shouldApply(filter)) {
      continue
    }

    const matchesValue = VALUE_MATCHERS[dynamicTypeFieldFilter.getFieldFilterType()]

    if (isUndefined(matchesValue)) {
      continue
    }

    matchers.push((item) => matchesValue(resolveRowValue(item, column, context.visibleFieldsMap), filter.filterValue))
  }

  return matchers
}
