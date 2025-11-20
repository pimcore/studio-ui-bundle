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
  DynamicTypeFieldFilterObjectBrickComponent,
  type DynamicTypeFieldFilterObjectBrickProps
} from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-object-object-brick'
import { container, serviceIds } from '@sdk/app'
import { DynamicTypeObjectDataRegistry } from '@sdk/modules/element'
import { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterDataObjectObjectBrick extends DynamicTypeFieldFilterAbstract {
  id = 'dataobject.objectbrick'

  shouldOverrideFilterType (): boolean {
    return true
  }

  isFilterAvailable(subtype: string | null): boolean {
    if (subtype === null) {
      return false;
    }

    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    const objectType = objectRegistry.getDynamicType(subtype)
    return objectType.dynamicTypeFieldFilterType.isFilterAvailable(null)
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterObjectBrickProps): ReactElement<DynamicTypeFieldFilterObjectBrickProps> {
    return (
      <DynamicTypeFieldFilterObjectBrickComponent { ...props } />
    )
  }

  transformFilterToApiRequest (filter: FieldFilter): any {
    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    const objectType = objectRegistry.getDynamicType(filter.meta.fieldDefinition.fieldtype as string)
    return objectType.dynamicTypeFieldFilterType.transformFilterToApiRequest(filter)
  }
}
