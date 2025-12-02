/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeFieldFilterBooleanSelect } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/boolean-select/dynamic-type-field-filter-boolean-select'

@injectable()
export class DynamicTypeFieldFilterBoolean extends DynamicTypeFieldFilterBooleanSelect {
  id = 'boolean'
}
