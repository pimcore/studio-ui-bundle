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
import { injectable } from 'inversify'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { DynamicTypeFieldFilterNumberComponent, type DynamicTypeFieldFilterNumberProps } from '../../components/dynamic-type-field-filter-number-component'

@injectable()
export class DynamicTypeFieldFilterId extends DynamicTypeFieldFilterAbstract {
  id = 'id'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Number
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterNumberProps): ReactElement<DynamicTypeFieldFilterNumberProps> {
    return (
      <DynamicTypeFieldFilterNumberComponent { ...props } />
    )
  }
}
