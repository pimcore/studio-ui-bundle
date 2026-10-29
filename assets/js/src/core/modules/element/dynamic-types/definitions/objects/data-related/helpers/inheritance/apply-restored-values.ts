/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { cloneDeep, isUndefined, setWith } from 'lodash'

/**
 * Overlays the loaded value of a keyed list (object bricks, classification store)
 * with the ancestor values of fields whose inheritance was restored although they
 * were overridden when loaded. The loaded value holds their own value, so it cannot
 * serve as the inherited one for them.
 *
 * @param restoredValues Ancestor values by field path relative to the list, as dot
 *   separated string (the format getFieldList reports).
 * @returns The loaded value itself while nothing was restored, so memoization on it
 *   keeps working.
 */
export const applyRestoredValues = (originalValue: object, restoredValues: Map<string, unknown>): object => {
  if (restoredValues.size === 0) {
    return originalValue
  }

  // numeric keys (e.g. classification store group ids) must create objects, not arrays
  const setAsObject = (objValue: unknown): unknown => isUndefined(objValue) ? {} : objValue
  const result = cloneDeep(originalValue)

  restoredValues.forEach((value, fieldName) => {
    setWith(result, fieldName.split('.'), value, setAsObject)
  })

  return result
}
