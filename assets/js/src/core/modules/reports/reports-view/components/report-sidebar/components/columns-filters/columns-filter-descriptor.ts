/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull, isUndefined } from 'lodash'
import { defineFilter } from '@Pimcore/components/filters'
import { type IDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
import { type DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { DynamicTypeFieldFilterDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/datetime/dynamic-type-field-filter-datetime'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { type NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import {
  type ReportColumnFilter,
  type ReportFilterContext,
  type ReportFilterContribution
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'
import {
  FRONTEND_TO_ORIGINAL_TYPE,
  getDateFieldFilterData,
  getNumberFieldFilterData
} from './field-filters/helpers'
import { FieldFilterOperators, type IFieldFilterTypeData } from './field-filters/types'

const buildColumnFilters = (
  fieldFilters: IDynamicFilter[],
  getType: ReportFilterContext['getType']
): ReportColumnFilter[] => fieldFilters
  .filter((item) => !isUndefined(item.data))
  .flatMap((item) => {
    const dynType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [item.frontendType!] }) as DynamicTypeFieldFilterAbstract | null

    const baseFilterData = {
      property: item.name!,
      type: FRONTEND_TO_ORIGINAL_TYPE[item.frontendType!]
    }
    const defaultFilterData: IFieldFilterTypeData = {
      operator: FieldFilterOperators.LIKE,
      value: String(item.data)
    }

    if (isNull(dynType)) {
      return [{ ...baseFilterData, ...defaultFilterData }]
    }

    // Incomplete filters (e.g. a date filter without a date) must not reach the backend as an empty condition
    const fieldFilter: FieldFilter = {
      key: item.name!,
      type: item.type,
      filterValue: item.data,
      locale: null,
      meta: { translationKey: item.translationKey }
    }

    if (!dynType.shouldApply(fieldFilter)) {
      return []
    }

    let filterData: IFieldFilterTypeData[]

    if (dynType instanceof DynamicTypeFieldFilterNumber) {
      filterData = getNumberFieldFilterData(item.data as NumberValue)
    } else if (dynType instanceof DynamicTypeFieldFilterDate || dynType instanceof DynamicTypeFieldFilterDatetime) {
      filterData = getDateFieldFilterData(item.data as DateValue)
    } else {
      filterData = [defaultFilterData]
    }

    // The empty side of a half-filled range (e.g. Between with only "from") would compare against '' and empty the grid
    return filterData
      .filter((filter) => filter.operator === FieldFilterOperators.LIKE || filter.value !== '')
      .map((filter) => ({
        ...baseFilterData,
        operator: filter.operator,
        value: filter.value
      }))
  })

export const columnsFilterDescriptor = defineFilter<IDynamicFilter[], ReportFilterContribution, ReportFilterContext>({
  key: 'fieldFilters',
  defaultValue: [],
  section: 'fields',
  order: 10,
  isEnabled: () => true,
  toQuery: (value, context) => buildColumnFilters(value, context.getType)
})
