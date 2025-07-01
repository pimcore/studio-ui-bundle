/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type PimcoreStudioApi } from '../index'

/**
 * Gets the PimcoreStudio API, checking parent window first, then current window
 * @throws Error if API is not available in either window
 */
export function getPimcoreStudioApi (): PimcoreStudioApi {
  // First check parent window
  const parentWindow = window.parent as any
  if (!isNil(parentWindow?.PimcoreStudio)) {
    return parentWindow.PimcoreStudio
  }

  // Then check current window
  const currentWindow = window as any
  if (!isNil(currentWindow?.PimcoreStudio)) {
    return currentWindow.PimcoreStudio
  }

  // If neither has the API, throw an error
  throw new Error('PimcoreStudio API is not available in parent or current window')
}

/**
 * Checks if the PimcoreStudio API is available
 */
export function isPimcoreStudioApiAvailable (): boolean {
  try {
    getPimcoreStudioApi()
    return true
  } catch {
    return false
  }
}
