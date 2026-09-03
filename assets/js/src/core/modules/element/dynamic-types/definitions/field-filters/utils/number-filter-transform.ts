/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import type { NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import { NumberFilterSettingValue } from './filter-setting-values'

export enum NumberFilterOperator {
  Is = 'is',
  LessThan = 'lessThan',
  GreaterThan = 'greaterThan',
  From = 'from',
  To = 'to'
}

export interface NumberFilterCondition {
  operator: NumberFilterOperator
  value: number
}

/**
 * Transforms a number field-filter value into the concrete conditions it
 * implies, the counterpart of `transformDateFilter`:
 *  - is → [is]
 *  - less → [lessThan] (exclusive, as the label says)
 *  - more → [greaterThan] (exclusive, as the label says)
 *  - between → [from, to] (inclusive range)
 *
 * Settings without a number contribute no condition.
 */
export const transformNumberFilter = (value: NumberValue): NumberFilterCondition[] => {
  const { setting, is, from, to } = value

  const condition = (operator: NumberFilterOperator, conditionValue: number | null): NumberFilterCondition[] =>
    isNil(conditionValue) ? [] : [{ operator, value: conditionValue }]

  switch (setting) {
    case NumberFilterSettingValue.LESS:
      return condition(NumberFilterOperator.LessThan, to)
    case NumberFilterSettingValue.MORE:
      return condition(NumberFilterOperator.GreaterThan, from)
    case NumberFilterSettingValue.BETWEEN:
      return [
        ...condition(NumberFilterOperator.From, from),
        ...condition(NumberFilterOperator.To, to)
      ]
    default:
      return condition(NumberFilterOperator.Is, is)
  }
}
