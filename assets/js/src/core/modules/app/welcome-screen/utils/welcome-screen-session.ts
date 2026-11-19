/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LOCAL_STORAGE_PREFIX } from '@Pimcore/constants/global'

// per browser tab and user: a reload does not open it again, a login as another user in the same tab does
const HANDLED_KEY = `${LOCAL_STORAGE_PREFIX}welcome_screen_handled`

export const isWelcomeScreenHandled = (userId: number): boolean => {
  try {
    return sessionStorage.getItem(HANDLED_KEY) === String(userId)
  } catch {
    return false
  }
}

export const markWelcomeScreenHandled = (userId: number): void => {
  try {
    sessionStorage.setItem(HANDLED_KEY, String(userId))
  } catch {
    // without session storage it opens again on a reload
  }
}

export const resetWelcomeScreen = (): void => {
  try {
    sessionStorage.removeItem(HANDLED_KEY)
  } catch {
    // nothing stored, nothing to reset
  }
}
