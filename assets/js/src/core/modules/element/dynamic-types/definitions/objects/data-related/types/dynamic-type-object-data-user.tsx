/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  DynamicTypeObjectDataAbstractSelect
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import { type DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export class DynamicTypeObjectDataUser extends DynamicTypeObjectDataAbstractSelect {
  id: string = 'user'

  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Multiselect'])
}
