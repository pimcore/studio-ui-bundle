/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Per browser tab, so a reload does not open the welcome screen again; a logout resets it for the next login
const HANDLED_KEY = 'pimcore-studio-welcome-screen-handled'

export const isWelcomeScreenHandled = (): boolean => {
  try {
    return sessionStorage.getItem(HANDLED_KEY) !== null
  } catch {
    return false
  }
}

export const markWelcomeScreenHandled = (): void => {
  try {
    sessionStorage.setItem(HANDLED_KEY, '1')
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
