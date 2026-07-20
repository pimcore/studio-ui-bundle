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
 * Normalises a notification payload into an object renderers can read.
 *
 * The same data arrives in two shapes: the detail endpoint returns it as a JSON string, while
 * Mercure may deliver it already decoded. Note the name collision worth keeping straight — the
 * Mercure envelope also has a `payload`, which holds the notification itself; this function is
 * about `notification.payload`.
 *
 * A payload is written by a producing bundle and read here, so malformed JSON is treated as
 * "no payload" rather than being allowed to break the notification list.
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
