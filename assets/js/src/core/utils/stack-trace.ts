/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { trimEnd } from 'lodash'

/**
 * Remove a PHP/Symfony/Pimcore-style stack trace from a message.
 * - If "Stack trace:" is present (any case), removal starts there.
 * - Otherwise removal starts at the first line that begins with "#<number>".
 * - If neither is found, the original string is returned.
 *
 * Returns the message with trailing whitespace trimmed.
 */
export function removePhpStackTrace (message: string): string {
  const headerIndex = message.search(/(?:stack trace|call stack):/i)
  const frameIndex = message.search(/(?:^|\r?\n|\\n)\s*#\d+\s/)

  if (headerIndex === -1 && frameIndex === -1) {
    return message
  }

  let cutAt = message.length
  if (headerIndex !== -1) {
    cutAt = Math.min(cutAt, headerIndex)
  }
  if (frameIndex !== -1) {
    cutAt = Math.min(cutAt, frameIndex)
  }

  return trimEnd(message.slice(0, cutAt))
}
