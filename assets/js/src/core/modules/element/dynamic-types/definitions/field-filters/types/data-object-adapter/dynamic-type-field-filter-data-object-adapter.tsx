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
import {
  DynamicTypeFieldFilterObjectAdapterComponent,
  type DynamicTypeFieldFilterObjectAdapterProps
} from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-object-adapter'

@injectable()
export class DynamicTypeFieldFilterObjectAdapter extends DynamicTypeFieldFilterAbstract {
  id = 'dataobject.adapter'

  getFieldFilterComponent (props: DynamicTypeFieldFilterObjectAdapterProps): ReactElement<DynamicTypeFieldFilterObjectAdapterProps> {
    return (
      <DynamicTypeFieldFilterObjectAdapterComponent { ...props } />
    )
  }
}
