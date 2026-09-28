/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export function replaceFileEnding (name: string, ending: string): string {
  const extensionP = name.split('.')
  extensionP[extensionP.length - 1] = ending
  return extensionP.join('.')
}

export function saveFileLocal (url: string, name?: string): void {
  const a = document.createElement('a')
  a.download = name ?? ''
  a.href = url
  a.click()
}

/**
 * Performs a HEAD-check before triggering a browser download.
 * Returns false when the server reports the file is unavailable (non-2xx),
 * so the caller can show an appropriate error message.
 * On network errors the download is attempted anyway.
 */
export async function downloadFromUrl (url: string, filename?: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    if (!response.ok) return false
  } catch {
    // Network error — attempt download anyway
  }
  saveFileLocal(url, filename)
  return true
}

/**
 * CDN-safe download: performs a GET availability check against a dedicated
 * endpoint (never the download URL itself) before triggering the browser
 * download. Avoids the HEAD-probe that Fastly turns into an origin GET,
 * which would consume single-use export files before the real download.
 * Returns false when the server reports the file is unavailable.
 * On a network error contacting the check endpoint the download is attempted anyway.
 */
export async function downloadFromUrlWithCheck (
  downloadUrl: string,
  checkUrl: string,
  filename?: string
): Promise<boolean> {
  try {
    const response = await fetch(checkUrl, { headers: { Accept: 'application/json' } })
    if (!response.ok) {
      return false
    }
    const data = await response.json() as { available?: boolean }
    if (data.available !== true) {
      return false
    }
  } catch {
    // Network error on the availability probe — attempt download anyway
  }
  saveFileLocal(downloadUrl, filename)
  return true
}
