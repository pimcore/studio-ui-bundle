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
