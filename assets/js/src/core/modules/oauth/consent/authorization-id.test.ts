/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { sanitizeAuthorizationId } from './authorization-id'

describe('sanitizeAuthorizationId', () => {
  const validId = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'

  it('keeps a well-formed 64-hex id', () => {
    expect(sanitizeAuthorizationId(validId)).toBe(validId)
  })

  it('treats a missing id as absent', () => {
    expect(sanitizeAuthorizationId(null)).toBeNull()
  })

  it.each([
    ['path traversal', '../../execution-engine/abort/1'],
    ['reserved colon', 'foo:bar'],
    ['slash', 'a/b'],
    ['uppercase hex', validId.toUpperCase()],
    ['too short', 'abc'],
    ['too long', `${validId}a`],
    ['non-hex chars', 'g'.repeat(64)],
    ['empty', '']
  ])('rejects a crafted id (%s) so it never reaches a request path', (_label, crafted) => {
    expect(sanitizeAuthorizationId(crafted)).toBeNull()
  })
})
