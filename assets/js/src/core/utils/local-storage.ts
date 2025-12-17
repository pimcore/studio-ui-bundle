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

/**
 * Get the prefixed key for local storage
 */
function getPrefixedKey (key: string): string {
  return `${LOCAL_STORAGE_PREFIX}${key}`
}

/**
 * Set a value in local storage with prefix
 */
export function setLocalStorageItem (key: string, value: string): void {
  try {
    localStorage.setItem(getPrefixedKey(key), value)
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

/**
 * Get a value from local storage with prefix
 */
export function getLocalStorageItem (key: string): string | null {
  try {
    return localStorage.getItem(getPrefixedKey(key))
  } catch (error) {
    console.warn('Failed to read from localStorage:', error)
    return null
  }
}

/**
 * Remove a value from local storage with prefix
 */
export function removeLocalStorageItem (key: string): void {
  try {
    localStorage.removeItem(getPrefixedKey(key))
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error)
  }
}

/**
 * Check if user has selected "don't ask again" for a specific key
 */
export function isDontAskAgainEnabled (key: string): boolean {
  return getLocalStorageItem(`dont_ask_again_${key}`) === 'true'
}

/**
 * Set "don't ask again" preference for a specific key
 */
export function setDontAskAgain (key: string, enabled: boolean): void {
  if (enabled) {
    setLocalStorageItem(`dont_ask_again_${key}`, 'true')
  } else {
    removeLocalStorageItem(`dont_ask_again_${key}`)
  }
}
