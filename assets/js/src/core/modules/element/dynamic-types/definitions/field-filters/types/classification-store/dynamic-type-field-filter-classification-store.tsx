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
import { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { container, serviceIds } from '@sdk/app'
import { DynamicTypeObjectRegistry } from '../../../objects/dynamic-type-object-registry'
import { DynamicTypeObjectDataRegistry } from '@sdk/modules/element'

@injectable()
export class DynamicTypeFieldFilterClassificationStore extends DynamicTypeFieldFilterAbstract {
  id = 'dataobject.classificationstore'

  shouldOverrideFilterType (): boolean {
    return true
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterObjectAdapterProps): ReactElement<DynamicTypeFieldFilterObjectAdapterProps> {
    return (
      <DynamicTypeFieldFilterObjectAdapterComponent { ...props } />
    )
  }

  shouldApply(filter: FieldFilter): boolean {
    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry']);

    console.log({objectRegistry, filter});
    const objectType = objectRegistry.getDynamicType(filter.meta.fieldDefinition.fieldtype)
    
    return objectType.dynamicTypeFieldFilterType.shouldApply(filter);
  }

  transformFilterToApiResponse (filter: FieldFilter): any {
    const { filterType } = filter

    const splittedType = filterType!.split('.')
    splittedType[0] = 'classificationstore'
    filter.filterType = splittedType.join('.')

    const objectRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry']);

    const objectType = objectRegistry.getDynamicType(filter.meta.fieldDefinition.fieldtype)
    const subTypeFilter = objectType.dynamicTypeFieldFilterType.transformFilterToApiResponse(filter);

    return {
      ...filter,
      filterValue: {
        value: subTypeFilter.filterValue,
        keyId: filter.meta.keyId,
        groupId: filter.meta.groupId
      }
    }
  }
}
