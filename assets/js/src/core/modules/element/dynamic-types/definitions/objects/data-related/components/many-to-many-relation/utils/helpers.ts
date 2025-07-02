/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ElementCellConfig, ElementInfo } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/element-cell/element-cell'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import type { ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export const getElementCellConfig = (disabled?: boolean): ElementCellConfig => {
  return {
    allowedTypes: [],
    getElementInfo: (itemProps: DefaultCellProps): ElementInfo => {
      const element: ManyToManyRelationValueItem = itemProps.row.original as ManyToManyRelationValueItem
      const elementType = mapToElementType(element.type)
      return {
        elementType: elementType ?? undefined,
        id: element.id,
        fullPath: element.fullPath,
        published: element.isPublished ?? undefined,
        disabled
      }
    }
  }
}
