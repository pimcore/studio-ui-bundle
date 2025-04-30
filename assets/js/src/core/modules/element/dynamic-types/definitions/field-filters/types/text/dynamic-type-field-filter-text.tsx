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
import { type DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterTextComponent, type DynamicTypeFieldFilterTextProps } from '../../components/dynamic-type-field-filter-text-component'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeFieldFilterText implements DynamicTypeFieldFilterAbstract {
  id = 'input'

  getFieldFilterComponent (props: DynamicTypeFieldFilterTextProps): ReactElement<DynamicTypeFieldFilterTextProps> {
    return (
      <DynamicTypeFieldFilterTextComponent { ...props } />
    )
  }
}
