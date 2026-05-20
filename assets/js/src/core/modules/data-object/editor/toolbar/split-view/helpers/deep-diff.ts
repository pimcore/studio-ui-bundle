/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEqual, isObject, isArray, set, isPlainObject } from 'lodash'

export const deepDiff = (current: any, base: any): any => {
  const result: any = {}

  const walk = (curr: any, prev: any, path: Array<string | number> = []): void => {
    const cObj: object = isPlainObject(curr) ? curr : {}
    const pObj: object = isPlainObject(prev) ? prev : {}

    const keys = new Set([
      ...Object.keys(cObj),
      ...Object.keys(pObj)
    ])

    keys.forEach((key) => {
      const nextPath = [...path, key]

      const c = curr?.[key]
      const p = prev?.[key]

      if (isArray(c) || isArray(p)) {
        if (!isEqual(c, p)) {
          set(result, nextPath, c)
        }
        return
      }

      const bothObjects = isObject(c) && isObject(p) && !isArray(c) && !isArray(p)

      if (bothObjects) {
        walk(c, p, nextPath)
        return
      }

      if (!isEqual(c, p)) {
        set(result, nextPath, c)
      }
    })
  }

  walk(current, base)

  return result
}
