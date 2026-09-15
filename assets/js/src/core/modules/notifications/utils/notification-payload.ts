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
 * Normalises `notification.payload` — a JSON string from the detail endpoint, already decoded
 * over Mercure — into an object renderers can read. Malformed JSON degrades to null rather than
 * throwing, since the payload is written by a producing bundle.
 *
 * Not to be confused with the Mercure envelope's own `payload`, which holds the notification.
 */
export const parseNotificationPayload = (
  raw: string | Record<string, unknown> | null | undefined
): Record<string, unknown> | null => {
  if (raw === null || raw === undefined || raw === '') {
    return null
  }

  if (typeof raw === 'object') {
    return raw
  }

  try {
    const parsed: unknown = JSON.parse(raw)

    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null
  } catch {
    return null
  }
}
