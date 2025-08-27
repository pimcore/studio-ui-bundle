/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import React, { type ReactElement } from 'react'
import { DynamicTypeFieldFilterCheckboxComponent, type DynamicTypeFieldFilterCheckboxProps } from '../../components/dynamic-type-field-filter-checkbox-component'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { FieldFilterFrontendType } from '../../frontendTypes'

@injectable()
export class DynamicTypeFieldFilterCheckbox extends DynamicTypeFieldFilterAbstract {
  id = 'checkbox'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.String
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterCheckboxProps): ReactElement<DynamicTypeFieldFilterCheckboxProps> {
    return (
      <DynamicTypeFieldFilterCheckboxComponent { ...props } />
    )
  }
}
