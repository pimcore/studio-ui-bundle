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
