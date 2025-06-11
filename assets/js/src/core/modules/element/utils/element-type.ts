/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ElementType } from '@Pimcore/types/enums/element/element-type'

export const isValidElementType = (type: string): boolean => {
  return allElementTypes.includes(type)
}

export const allElementTypes = ['asset', 'document', 'data-object']

//TODO: remove once legacy element types were replaces
export const allLegacyElementTypes = ['asset', 'document', 'object']

export const mapToElementType = (elementType: string): ElementType | null => {
  switch (elementType) {
    case 'asset':
      return 'asset'

    case 'document':
      return 'document'

    case 'data-object':
    case 'object':
    case 'dataObject':
      return 'data-object'

    default:
      return null
  }
}
