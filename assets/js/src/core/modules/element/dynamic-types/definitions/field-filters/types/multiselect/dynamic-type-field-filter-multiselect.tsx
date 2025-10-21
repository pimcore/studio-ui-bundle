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
  DynamicTypeFieldFilterMultiselectComponent,
  type MultiselectValue
} from '../../components/dynamic-type-field-filter-multiselect-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import {
  FieldFilterOperators,
  type IFieldFilterTypeData
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types'

@injectable()
export class DynamicTypeFieldFilterMultiselect extends DynamicTypeFieldFilterAbstract {
  id = 'multiselect'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Select
  }

  getFieldFilterComponent (): ReactElement<DynamicTypeFieldFilterAbstract> {
    return (
      <DynamicTypeFieldFilterMultiselectComponent />
    )
  }

  getReportFieldFilterData (props: MultiselectValue): IFieldFilterTypeData[] {
    return props.map(value => (
      { operator: FieldFilterOperators.EQUAL, value }
    ))
  }
}
