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
import { DynamicTypeFieldFilterNumberComponent, type DynamicTypeFieldFilterNumberProps } from '../../components/dynamic-type-field-filter-number-component'
import { FieldFilterFrontendType } from '../../frontendTypes'

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

  shouldApply (value: any): boolean {
    if (value == null || typeof value !== 'object') {
      return false
    }

    return value.is != null || value.from != null || value.to != null
  }
}
