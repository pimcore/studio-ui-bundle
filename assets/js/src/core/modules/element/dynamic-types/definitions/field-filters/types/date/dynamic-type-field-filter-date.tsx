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
import { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

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

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue;

    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.on != null || value.from != null || value.to != null
  }
}
