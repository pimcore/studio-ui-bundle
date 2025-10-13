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

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!isNil(navigator.clipboard) && !isNil(navigator.clipboard.writeText)) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback method:', error)
    }
  }

  return copyToClipboardFallback(text)
}

const copyToClipboardFallback = (text: string): boolean => {
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    textArea.setAttribute('readonly', '')
    textArea.setAttribute('aria-hidden', 'true')

    document.body.appendChild(textArea)
    textArea.select()
    textArea.setSelectionRange(0, 99999)

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)

    return successful
  } catch (error) {
    console.error('Fallback clipboard method failed:', error)
    return false
  }
}

export const copyToClipboardWithFeedback = async (
  text: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> => {
  const success = await copyToClipboard(text)

  if (success) {
    onSuccess?.()
  } else {
    onError?.('Failed to copy to clipboard')
  }
}
