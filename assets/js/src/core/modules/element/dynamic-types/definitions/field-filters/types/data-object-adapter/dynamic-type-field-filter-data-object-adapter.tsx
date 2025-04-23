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
import { injectable } from 'inversify'
import { type DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import {
  DynamicTypeFieldFilterObjectAdapterComponent,
  type DynamicTypeFieldFilterObjectAdapterProps
} from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-object-adapter'

@injectable()
export class DynamicTypeFieldFilterObjectAdapter implements DynamicTypeFieldFilterAbstract {
  id = 'dataobject.adapter'

  getFieldFilterComponent (props: DynamicTypeFieldFilterObjectAdapterProps): ReactElement<DynamicTypeFieldFilterObjectAdapterProps> {
    return (
      <DynamicTypeFieldFilterObjectAdapterComponent { ...props } />
    )
  }
}
