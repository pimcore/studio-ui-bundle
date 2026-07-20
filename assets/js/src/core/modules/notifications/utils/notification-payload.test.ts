/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { parseNotificationPayload } from './notification-payload'

describe('parseNotificationPayload', () => {
  it('parses the JSON string shape returned by the detail endpoint', () => {
    expect(parseNotificationPayload('{"threadId":42,"title":"Review"}')).toEqual({
      threadId: 42,
      title: 'Review'
    })
  })

  it('passes an already decoded object through', () => {
    const payload = { threadId: 42 }

    expect(parseNotificationPayload(payload)).toBe(payload)
  })

  it.each([null, undefined, ''])('treats %p as no payload', (raw) => {
    expect(parseNotificationPayload(raw)).toBeNull()
  })

  /**
   * A payload is written by a producing bundle. Malformed JSON must degrade to "no payload"
   * rather than throwing and taking the notification list down with it.
   */
  it('returns null for malformed JSON instead of throwing', () => {
    expect(parseNotificationPayload('{not valid json')).toBeNull()
  })

  it.each([
    ['an array', '[1,2,3]'],
    ['a bare string', '"hello"'],
    ['a number', '42'],
    ['null', 'null']
  ])('returns null when the JSON is %s rather than an object', (_label, raw) => {
    expect(parseNotificationPayload(raw)).toBeNull()
  })
})
