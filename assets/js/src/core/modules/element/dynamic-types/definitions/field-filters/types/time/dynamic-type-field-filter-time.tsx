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
import { DynamicTypeFieldFilterDateComponent, type DynamicTypeFieldFilterDateProps } from '../../components/dynamic-type-field-filter-date-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { DynamicTypeFieldFilterTimeComponent, DynamicTypeFieldFilterTimeProps } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-time-component'

@injectable()
export class DynamicTypeFieldFilterTime extends DynamicTypeFieldFilterAbstract {
  id = 'time'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Time
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterTimeProps): ReactElement<DynamicTypeFieldFilterTimeProps> {
    return (
      <DynamicTypeFieldFilterTimeComponent { ...props } />
    )
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.on != null || value.from != null || value.to != null
  }
}
