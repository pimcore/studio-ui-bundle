/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isString } from 'lodash'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'

interface TypedConfig { elementType?: string | null, classId?: string | null }

/**
 * Resolves the element type a saved search targets. Prefers the stored `elementType`; falls back to
 * inferring from `classId` for legacy searches saved before `elementType` existed (classId present →
 * data object, otherwise asset). The fallback can't tell a classless data-object search from an
 * asset search — that's exactly why `elementType` is now stored.
 */
export const resolveSavedSearchElementType = (config: TypedConfig): ElementType => {
  if (config.elementType === elementTypes.asset || config.elementType === elementTypes.dataObject) {
    return config.elementType
  }

  return isString(config.classId) && !isEmpty(config.classId) ? elementTypes.dataObject : elementTypes.asset
}
