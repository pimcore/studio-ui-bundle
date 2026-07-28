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
import { isNil } from 'lodash'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import {
  DynamicTypeFieldFilterFileSizeComponent,
  type DynamicTypeFieldFilterFileSizeProps
} from '../../components/dynamic-type-field-filter-file-size-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

/**
 * File-size field filter for the asset `size` column. Like the quantity-value filter, the frontend
 * stays dumb: it hands the raw value plus the chosen unit (KB/MB/GB) to the backend, which converts
 * to bytes and applies the range. The unit is required, so a value without a unit is not applied.
 */
@injectable()
export class DynamicTypeFieldFilterFileSize extends DynamicTypeFieldFilterAbstract {
  id = FieldFilterFrontendType.FileSize

  getFieldFilterType (): string {
    return FieldFilterFrontendType.FileSize
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterFileSizeProps): ReactElement<DynamicTypeFieldFilterFileSizeProps> {
    return (
      <DynamicTypeFieldFilterFileSizeComponent { ...props } />
    )
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (value == null || typeof value !== 'object') {
      return false
    }

    if (isNil(value.unit)) {
      return false
    }

    // Only apply once the bound(s) the selected setting needs are filled, so an incomplete draft
    // (e.g. "between" with only one bound) is never sent to the backend.
    switch (value.setting) {
      case 'is':
        return !isNil(value.is)
      case 'less':
        return !isNil(value.to)
      case 'more':
        return !isNil(value.from)
      case 'between':
        return !isNil(value.from) && !isNil(value.to)
      default:
        return false
    }
  }
}
