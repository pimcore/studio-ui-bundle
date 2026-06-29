/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { NotesFilterOperator, type OperatorValue } from '@Pimcore/modules/notes-and-events/filters/types'
import { DateFilterOperator, transformDateFilter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/date-filter-transform'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'

const OPERATOR_MAP: Record<DateFilterOperator, NotesFilterOperator> = {
  [DateFilterOperator.On]: NotesFilterOperator.Equal,
  [DateFilterOperator.From]: NotesFilterOperator.GreaterThan,
  [DateFilterOperator.To]: NotesFilterOperator.LessThan
}

export const getDateOperatorValues = (value: DateValue): OperatorValue[] =>
  transformDateFilter(value).map(({ operator, value }) => ({ operator: OPERATOR_MAP[operator], value }))
