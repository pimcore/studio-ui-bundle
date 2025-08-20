/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isNil } from 'lodash'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export const locateElementInTree = (elementType: ElementType | undefined, elementId: number | undefined): void => {
  if (!isNil(elementId) && !isNil(elementType)) {
    try {
      const studioApi = getPimcoreStudioApi()
      studioApi.element.locateInTree(elementId, elementType)
    } catch (error) {
      console.error('Failed to locate element in tree:', error)
    }
  }
}
