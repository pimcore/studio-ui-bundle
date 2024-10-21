/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
