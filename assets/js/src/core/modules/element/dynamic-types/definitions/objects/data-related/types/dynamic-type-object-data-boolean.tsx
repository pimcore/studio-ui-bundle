/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { ReactElement } from 'react'

export class DynamicTypeObjectDataBoolean extends DynamicTypeObjectDataAbstract {
  getObjectDataComponent(props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition> {
    throw new Error('Method not implemented.')
  }
  id: string = 'boolean'
  
  protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Checkbox'])
}
