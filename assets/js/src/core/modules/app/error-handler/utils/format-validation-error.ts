/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { escape } from 'lodash'

/**
 * Builds the HTML body for an element validation error. `message` is the
 * server-combined violation text, one violation per line. A single violation
 * renders as a plain line; multiple render as an unordered list.
 *
 * Each violation is HTML-escaped before interpolation, so the message text is
 * always displayed literally: the ul/li wrapper is the only markup, and
 * SanitizeHtml (DOMPurify) keeps it. Without escaping, HTML-like text in a
 * message would be rendered as markup (DOMPurify's default allowlist keeps
 * headings, links, images, list items, …) rather than shown to the user.
 */
export const formatValidationErrorHtml = (message: string): string => {
  const items = message
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => escape(line))

  if (items.length <= 1) {
    return items[0] ?? ''
  }

  const listItems = items.map((item) => `<li>${item}</li>`).join('')

  return `<ul>${listItems}</ul>`
}
