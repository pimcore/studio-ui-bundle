/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import type { ElementType } from '@Pimcore/types/enums/element/element-type'

export interface ElementWithWorkflowAvailability {
  hasWorkflowAvailable?: boolean
  type?: string
}

export const isWorkflowAvailable = (
  element: ElementWithWorkflowAvailability | null | undefined,
  elementType: ElementType
): boolean => {
  if (isNil(element)) {
    return false
  }

  if (elementType === 'asset' && element.type === 'folder') {
    return false
  }

  return element.hasWorkflowAvailable ?? false
}
