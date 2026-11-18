/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Per browser tab and user, so a reload does not open the welcome screen again, while a login as another user
// in the same tab does; a logout resets it for the next login
const HANDLED_KEY = 'pimcore-studio-welcome-screen-handled'

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
    // without session storage the welcome screen opens again on a reload
  }
}

export const resetWelcomeScreen = (): void => {
  try {
    sessionStorage.removeItem(HANDLED_KEY)
  } catch {
    // nothing stored, nothing to reset
  }
}
