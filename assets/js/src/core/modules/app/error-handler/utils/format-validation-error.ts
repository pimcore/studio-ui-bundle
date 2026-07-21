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
 * Builds the HTML body for an element validation error. `message` is the
 * server-combined violation text, one violation per line. A single violation
 * renders as a plain line; multiple render as an unordered list. The result is
 * passed through SanitizeHtml (DOMPurify), which keeps ul/li.
 */
export const formatValidationErrorHtml = (message: string): string => {
  const items = message
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (items.length <= 1) {
    return items[0] ?? ''
  }

  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
}
