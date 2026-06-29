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
import { NotesFilterOperator, type OperatorValue } from '@Pimcore/modules/notes-and-events/filters/types'
import { DatePickerSettingValue, type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'

export const getDateOperatorValues = (value: DateValue): OperatorValue[] => {
  const { setting, on, from, to } = value

  switch (setting) {
    case DatePickerSettingValue.BEFORE:
      return [{ operator: NotesFilterOperator.LessThan, value: toString(to) }]
    case DatePickerSettingValue.AFTER:
      return [{ operator: NotesFilterOperator.GreaterThan, value: toString(from) }]
    case DatePickerSettingValue.BETWEEN:
      return [
        { operator: NotesFilterOperator.GreaterThan, value: toString(from) },
        { operator: NotesFilterOperator.LessThan, value: toString(to) }
      ]
    default:
      return [{ operator: NotesFilterOperator.Equal, value: toString(on) }]
  }
}

