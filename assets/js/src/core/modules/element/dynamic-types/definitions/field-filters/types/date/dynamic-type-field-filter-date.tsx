/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import {
  DatePickerSettingValue,
  type DateValue,
  DynamicTypeFieldFilterDateComponent,
  type DynamicTypeFieldFilterDateProps
} from '../../components/dynamic-type-field-filter-date-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import {
  FieldFilterOperators,
  type IFieldFilterTypeData
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types'

@injectable()
export class DynamicTypeFieldFilterDate extends DynamicTypeFieldFilterAbstract {
  id = 'datetime'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.DateTime
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterDateProps): ReactElement<DynamicTypeFieldFilterDateProps> {
    return (
      <DynamicTypeFieldFilterDateComponent { ...props } />
    )
  }

  getReportFieldFilterData (props: DateValue): IFieldFilterTypeData[] {
    const { setting, from, to, on } = props

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

  shouldApply (value: any): boolean {
    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.on != null || value.from != null || value.to != null
  }
}
