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
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterDateComponent, type DynamicTypeFieldFilterDateProps } from '../../components/dynamic-type-field-filter-date-component'
import { injectable } from 'inversify'
import { FieldFilterFrontendType } from '../../frontendTypes'

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

  shouldApply (value: any): boolean {
    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.on != null || value.from != null || value.to != null
  }
}
