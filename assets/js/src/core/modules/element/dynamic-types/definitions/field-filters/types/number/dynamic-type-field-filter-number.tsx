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
import { DynamicTypeFieldFilterNumberComponent, type DynamicTypeFieldFilterNumberProps } from '../../components/dynamic-type-field-filter-number-component'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeFieldFilterNumber implements DynamicTypeFieldFilterAbstract {
  id = 'id'

  getFieldFilterComponent (props: DynamicTypeFieldFilterNumberProps): ReactElement<DynamicTypeFieldFilterNumberProps> {
    return (
      <DynamicTypeFieldFilterNumberComponent { ...props } />
    )
  }
}
