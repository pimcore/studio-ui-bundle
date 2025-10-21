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
import { isNull } from 'lodash'
import { injectable } from 'inversify'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import {
  DynamicTypeFieldFilterNumberComponent,
  type DynamicTypeFieldFilterNumberProps,
  NumberFilterSettingValue,
  type NumberValue
} from '../../components/dynamic-type-field-filter-number-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { FieldFilterOperators, type IFieldFilterTypeData } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types'

@injectable()
export class DynamicTypeFieldFilterNumber extends DynamicTypeFieldFilterAbstract {
  id = 'number'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Number
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterNumberProps): ReactElement<DynamicTypeFieldFilterNumberProps> {
    return (
      <DynamicTypeFieldFilterNumberComponent { ...props } />
    )
  }

  getReportFieldFilterData (props: NumberValue): IFieldFilterTypeData[] {
    const { setting, from, to, is } = props

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
          operator: FieldFilterOperators.EQUAL,
          value: getValue(from)
        },
        {
          operator: FieldFilterOperators.EQUAL,
          value: getValue(to)
        },
        {
          operator: FieldFilterOperators.LESS_THAN,
          value: getValue(to)
        }
      ]
    }

    return operatorMap[setting] ?? operatorMap[NumberFilterSettingValue.IS]
  }

  shouldApply (value: any): boolean {
    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.is != null || value.from != null || value.to != null
  }
}
