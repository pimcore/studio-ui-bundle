/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'

/**
 * Resolves the element type a saved search targets from its stored `elementType`. A classless
 * data-object search has no classId, so the stored elementType is the only reliable signal.
 * Defaults to asset when absent.
 */
export const resolveSavedSearchElementType = (config: { elementType?: string | null }): ElementType =>
  config.elementType === elementTypes.dataObject ? elementTypes.dataObject : elementTypes.asset
