/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldFilterAbstract } from '../dynamic-type-field-filter-abstract'

/**
 * The resolver gives either a field filter type itself or a type that holds one, e.g. the metadata and the object
 * data types. Returns the field filter type of both, or null for anything else.
 */
export const toFieldFilterType = (type: unknown): DynamicTypeFieldFilterAbstract | null => {
  if (type === null || type === undefined) {
    return null
  }

  if (type instanceof DynamicTypeFieldFilterAbstract) {
    return type
  }

  if (typeof type === 'object' && 'dynamicTypeFieldFilterType' in type) {
    return type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
  }

  return null
}
