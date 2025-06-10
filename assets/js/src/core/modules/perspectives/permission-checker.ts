/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@sdk/app'
import { selectActivePerspective } from './active-perspective-slice'
import { isNil } from 'lodash'

export const isAllowedInPerspective = (permission: string): boolean => {
  const activePerspective = selectActivePerspective(store.getState())
  if (isNil(activePerspective)) {
    return false
  }

  return isPathTrue(activePerspective.contextPermissions, permission)
}

const isPathTrue = (obj: Record<string, any> | null | undefined, path: string): boolean => {
  if (isNil(obj)) {
    return false
  }
  const keys = path.split('.')
  let current: any = obj

  for (const key of keys) {
    if (typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return false
    }
  }

  return current === true
}
