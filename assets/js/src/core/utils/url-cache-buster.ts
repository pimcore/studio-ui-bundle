/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Adds a timestamp-based cache buster parameter to a URL to force reload and bypass cache
 * @param url - The original URL
 * @param parameterName - The name of the cache buster parameter (default: '_cb')
 * @returns URL with added cache buster parameter using current timestamp in milliseconds
 */
export function addCacheBusterToUrl (url: string, parameterName: string = '_cb'): string {
  const cacheBuster = Date.now().toString()

  try {
    const urlObj = new URL(url, window.location.origin)
    urlObj.searchParams.set(parameterName, cacheBuster)
    return urlObj.toString()
  } catch (error) {
    // Fallback for invalid URLs - just append the parameter
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}${parameterName}=${cacheBuster}`
  }
}
