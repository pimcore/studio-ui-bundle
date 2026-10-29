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
import { DynamicTypeFieldFilterStringComponent } from '../../components/dynamic-type-field-filter-string-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { parseMultiValueFilter } from '../../utils/multi-value-filter'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterString extends DynamicTypeFieldFilterAbstract {
  id = 'string'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.String
  }

  getFieldFilterComponent (): ReactElement<DynamicTypeFieldFilterAbstract> {
    return (
      <DynamicTypeFieldFilterStringComponent />
    )
  }

  shouldApply (filter: FieldFilter): boolean {
    if (typeof filter.filterValue === 'string' && filter.filterValue.trim() === '') {
      return false
    }

    return super.shouldApply(filter)
  }

  transformFilterToApiRequest (filter: FieldFilter): FieldFilter {
    const transformedFilter = { ...filter }

    if (typeof filter.filterValue === 'string') {
      transformedFilter.filterValue = parseMultiValueFilter(filter.filterValue)
    }

    return super.transformFilterToApiRequest(transformedFilter)
  }
}
