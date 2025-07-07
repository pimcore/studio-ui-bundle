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
 * Custom error classes for iframe API
 */
export class PimcoreStudioApiNotAvailableError extends Error {
  constructor (message: string = 'PimcoreStudio API is not available') {
    super(message)
    this.name = 'PimcoreStudioApiNotAvailableError'
  }
}

export class CrossOriginApiAccessError extends Error {
  constructor (message: string = 'Cross-origin access to PimcoreStudio API denied') {
    super(message)
    this.name = 'CrossOriginApiAccessError'
  }
}

/**
 * Gets the PimcoreStudio API, checking parent window first, then current window
 * @throws PimcoreStudioApiNotAvailableError if API is not available in either window
 * @throws CrossOriginApiAccessError if cross-origin restrictions prevent access
 */
export function getPimcoreStudioApi (): PimcoreStudioApi {
  try {
    // First check parent window
    const parentWindow = window.parent as any
    if (!isNil(parentWindow?.PimcoreStudio)) {
      return parentWindow.PimcoreStudio
    }
  } catch (error) {
    // Cross-origin restrictions might prevent access
    console.debug('Cannot access parent window PimcoreStudio API due to cross-origin restrictions')
  }

  try {
    // Then check current window
    const currentWindow = window as any
    if (!isNil(currentWindow?.PimcoreStudio)) {
      return currentWindow.PimcoreStudio
    }
  } catch (error) {
    throw new CrossOriginApiAccessError('Cannot access current window PimcoreStudio API')
  }

  // If neither has the API, throw an error
  throw new PimcoreStudioApiNotAvailableError('PimcoreStudio API is not available in parent or current window')
}

/**
 * Checks if the PimcoreStudio API is available
 * @returns true if API is available, false otherwise
 */
export function isPimcoreStudioApiAvailable (): boolean {
  try {
    getPimcoreStudioApi()
    return true
  } catch (error) {
    if (error instanceof PimcoreStudioApiNotAvailableError || error instanceof CrossOriginApiAccessError) {
      return false
    }
    // Re-throw unexpected errors
    throw error
  }
}
