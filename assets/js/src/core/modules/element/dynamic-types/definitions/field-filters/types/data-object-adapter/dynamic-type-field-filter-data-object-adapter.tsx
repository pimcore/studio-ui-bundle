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
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeObjectDataRegistry } from '@sdk/modules/element'

@injectable()
export class DynamicTypeFieldFilterObjectAdapter extends DynamicTypeFieldFilterAbstract {
  id = 'dataobject.adapter'

  shouldOverrideFilterType (): boolean {
    return true
  }

  isFilterAvailable (subtype: string | null): boolean {
    if (subtype === null) {
      return false
    }

    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    if (!objectRegistry.hasDynamicType(subtype)) {
      return false
    }

    const objectType = objectRegistry.getDynamicType(subtype)
    return objectType.dynamicTypeFieldFilterType.isFilterAvailable(null)
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterObjectAdapterProps): ReactElement<DynamicTypeFieldFilterObjectAdapterProps> {
    return (
      <DynamicTypeFieldFilterObjectAdapterComponent { ...props } />
    )
  }

  transformFilterToApiRequest (filter: FieldFilter): any {
    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    const objectType = objectRegistry.getDynamicType(filter.meta.fieldDefinition.fieldtype as string)
    return objectType.dynamicTypeFieldFilterType.transformFilterToApiRequest(filter)
  }
}
