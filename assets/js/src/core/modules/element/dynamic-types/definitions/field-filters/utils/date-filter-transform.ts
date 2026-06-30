/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { toString } from 'lodash'
import { DatePickerSettingValue, type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'

export enum DateFilterOperator {
  On = 'on',
  From = 'from',
  To = 'to'
}

export interface DateFilterCondition {
  operator: DateFilterOperator
  value: string
}

/**
 * Transforms a date field-filter value into the concrete date conditions it implies:
 *  - before → [to]
 *  - after → [from]
 *  - between → [from, to]
 *  - on → [on]
 */
export const transformDateFilter = (value: DateValue): DateFilterCondition[] => {
  const { setting, on, from, to } = value

  switch (setting) {
    case DatePickerSettingValue.BEFORE:
      return [{ operator: DateFilterOperator.To, value: toString(to) }]
    case DatePickerSettingValue.AFTER:
      return [{ operator: DateFilterOperator.From, value: toString(from) }]
    case DatePickerSettingValue.BETWEEN:
      return [
        { operator: DateFilterOperator.From, value: toString(from) },
        { operator: DateFilterOperator.To, value: toString(to) }
      ]
    default:
      return [{ operator: DateFilterOperator.On, value: toString(on) }]
  }
}
