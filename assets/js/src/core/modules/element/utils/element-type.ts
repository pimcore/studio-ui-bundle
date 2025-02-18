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

import type { ElementType } from '@Pimcore/types/enums/element/element-type'

export const isValidElementType = (type: string): boolean => {
  return allElementTypes.includes(type)
}

export const allElementTypes = ['asset', 'document', 'data-object']

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
