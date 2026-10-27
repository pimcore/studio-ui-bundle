/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getKeyLabel } from './key-label'

const KEY_NAME = 'ef000001'

const key = (
  title: string | null,
  definition: object = {}
): { name: string, title: string | null, definition: object } => ({ name: KEY_NAME, title, definition })

describe('getKeyLabel', () => {
  it('labels a key with its title', () => {
    expect(getKeyLabel(key('Height'))).toBe('Height')
  })

  it('falls back to the name when the title is null', () => {
    expect(getKeyLabel(key(null))).toBe(KEY_NAME)
  })

  it('falls back to the name when the title is empty', () => {
    expect(getKeyLabel(key(''))).toBe(KEY_NAME)
  })

  it('ignores a title carried in the key definition', () => {
    expect(getKeyLabel(key(null, { title: 'Legacy' }))).toBe(KEY_NAME)
  })
})
