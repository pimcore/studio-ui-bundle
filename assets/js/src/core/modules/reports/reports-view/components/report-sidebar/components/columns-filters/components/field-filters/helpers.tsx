/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull } from 'lodash'
import { FieldFilterFrontendType } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/frontendTypes'
import { NumberFilterSettingValue, type NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import { FieldFilterOperators, type IFieldFilterTypeData } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types'
import {
  DatePickerSettingValue,
  type DateValue
} from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'

export const FIELD_TYPE_MAP = {
  string: {
    frontendType: 'string',
    type: FieldFilterFrontendType.String
  },
  numeric: {
    frontendType: 'number',
    type: FieldFilterFrontendType.Number
  },
  boolean: {
    frontendType: 'boolean',
    type: FieldFilterFrontendType.Boolean
  },
  date: {
    frontendType: 'datetime',
    type: FieldFilterFrontendType.DateTime
  }
}

export const FRONTEND_TO_ORIGINAL_TYPE = Object.fromEntries(
  Object.entries(FIELD_TYPE_MAP).map(([originalType, config]) => [
    config.frontendType,
    originalType
  ])
)

export const getNumberFieldFilterData = (data: NumberValue): IFieldFilterTypeData[] => {
  const { setting, from, to, is } = data

  const getValue = (value: number | null): string => !isNull(value) ? String(value) : ''

  const operatorMap: Record<NumberFilterSettingValue, IFieldFilterTypeData[]> = {
    [NumberFilterSettingValue.IS]: [{
      operator: FieldFilterOperators.EQUAL,
      value: getValue(is)
    }],
    [NumberFilterSettingValue.LESS]: [{
      operator: FieldFilterOperators.LESS_THAN,
      value: getValue(to)
    }],
    [NumberFilterSettingValue.MORE]: [{
      operator: FieldFilterOperators.GREATER_THAN,
      value: getValue(from)
    }],
    [NumberFilterSettingValue.BETWEEN]: [
      {
        operator: FieldFilterOperators.GREATER_THAN,
        value: getValue(from)
      },
      {
        operator: FieldFilterOperators.LESS_THAN,
        value: getValue(to)
      }
    ]
  }

  return operatorMap[setting] ?? operatorMap[NumberFilterSettingValue.IS]
}

export const getDateFieldFilterData = (data: DateValue): IFieldFilterTypeData[] => {
  const { setting, from, to, on } = data

  const getValue = (value: string | null): string => value ?? ''

  const operatorMap: Record<DatePickerSettingValue, IFieldFilterTypeData[]> = {
    [DatePickerSettingValue.ON]: [{
      operator: FieldFilterOperators.EQUAL,
      value: getValue(on)
    }],
    [DatePickerSettingValue.BEFORE]: [{
      operator: FieldFilterOperators.LESS_THAN,
      value: getValue(to)
    }],
    [DatePickerSettingValue.AFTER]: [{
      operator: FieldFilterOperators.GREATER_THAN,
      value: getValue(from)
    }],
    [DatePickerSettingValue.BETWEEN]: [
      {
        operator: FieldFilterOperators.GREATER_THAN,
        value: getValue(from)
      },
      {
        operator: FieldFilterOperators.LESS_THAN,
        value: getValue(to)
      }
    ]
  }

  return operatorMap[setting] ?? operatorMap[DatePickerSettingValue.ON]
}
