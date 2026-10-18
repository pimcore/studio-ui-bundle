/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import 'reflect-metadata'

// The filter pickers pull in antd and antd-style (untranspiled ESM); the descriptor only needs the type classes
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component', () => ({
  ...jest.requireActual('@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/filter-setting-values'),
  DynamicTypeFieldFilterDateComponent: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component', () => ({
  ...jest.requireActual('@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/filter-setting-values'),
  DynamicTypeFieldFilterNumberComponent: () => null
}))

/* eslint-disable import/first */
import { columnsFilterDescriptor } from './columns-filter-descriptor'
import { type IDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
import { type ReportFilterContext } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'
import { DatePickerSettingValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/filter-setting-values'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { DynamicTypeFieldFilterDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/datetime/dynamic-type-field-filter-datetime'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { DynamicTypeFieldFilterString } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/string/dynamic-type-field-filter-string'

/* eslint-enable import/first */

const FIELD = 'creationDate'
const DATE_FROM = '2020-01-01'
const DATE_TO = '2021-01-01'

const dynamicTypes = {
  date: new DynamicTypeFieldFilterDate(),
  datetime: new DynamicTypeFieldFilterDatetime(),
  number: new DynamicTypeFieldFilterNumber(),
  string: new DynamicTypeFieldFilterString()
}

const context: ReportFilterContext = {
  getType: jest.fn(({ dynamicTypeIds }) => dynamicTypes[dynamicTypeIds[0] as keyof typeof dynamicTypes] ?? null) as ReportFilterContext['getType']
}

const toQuery = (filter: Pick<IDynamicFilter, 'frontendType' | 'data'>): unknown => {
  const filters: IDynamicFilter[] = [{ id: FIELD, name: FIELD, translationKey: FIELD, type: FIELD, ...filter }]

  return columnsFilterDescriptor.toQuery?.(filters, context)
}

const dateValue = (setting: DatePickerSettingValue): object => ({ setting, on: DATE_FROM, from: DATE_FROM, to: DATE_TO })

describe('columnsFilterDescriptor.toQuery', () => {
  // The reports view maps the report filter type `date` to the frontend type `datetime`.
  it.each([
    [DatePickerSettingValue.AFTER, [{ operator: 'gt', value: DATE_FROM }]],
    [DatePickerSettingValue.BEFORE, [{ operator: 'lt', value: DATE_TO }]],
    [DatePickerSettingValue.ON, [{ operator: 'eq', value: DATE_FROM }]],
    [DatePickerSettingValue.BETWEEN, [{ operator: 'gt', value: DATE_FROM }, { operator: 'lt', value: DATE_TO }]]
  ])('converts a datetime filter with setting %s to date operators', (setting, expected) => {
    expect(toQuery({ frontendType: 'datetime', data: dateValue(setting) })).toEqual(
      expected.map((condition) => ({ property: FIELD, type: 'date', ...condition }))
    )
  })

  it.each([
    [DatePickerSettingValue.BEFORE, { setting: DatePickerSettingValue.BEFORE, on: null, from: null, to: null }],
    [DatePickerSettingValue.BETWEEN, { setting: DatePickerSettingValue.BETWEEN, on: null, from: null, to: null }]
  ])('sends no condition for a datetime filter with setting %s and no date', (_setting, data) => {
    expect(toQuery({ frontendType: 'datetime', data })).toEqual([])
  })

  it('converts a number filter to number operators', () => {
    expect(toQuery({ frontendType: 'number', data: { setting: 'is', from: null, to: null, is: 5 } })).toEqual([
      { property: FIELD, type: 'numeric', operator: 'eq', value: '5' }
    ])
  })

  it('sends other types as like with the string value', () => {
    expect(toQuery({ frontendType: 'string', data: 'abc' })).toEqual([
      { property: FIELD, type: 'string', operator: 'like', value: 'abc' }
    ])
  })
})
