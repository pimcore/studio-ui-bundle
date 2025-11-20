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
import { DynamicTypeFieldFilterMultiselectComponent } from '../../components/dynamic-type-field-filter-multiselect-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterMultiselect extends DynamicTypeFieldFilterAbstract {
  id = 'multiselect'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Select
  }

  transformFilterToApiRequest (filter: FieldFilter): FieldFilter {
    const transformedFilter = { ...filter }
    if (Array.isArray(filter.filterValue)) {
      transformedFilter.filterValue = filter.filterValue.map(String)
    }

    return super.transformFilterToApiRequest(transformedFilter)
  }

  getFieldFilterComponent (): ReactElement<DynamicTypeFieldFilterAbstract> {
    return (
      <DynamicTypeFieldFilterMultiselectComponent />
    )
  }
}
