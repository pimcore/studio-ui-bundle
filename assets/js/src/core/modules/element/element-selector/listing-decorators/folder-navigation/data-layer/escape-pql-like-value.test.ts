/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { escapePqlLikeValue } from './escape-pql-like-value'

describe('escapePqlLikeValue', () => {
  it('leaves a plain path untouched', () => {
    expect(escapePqlLikeValue('/Car Images')).toBe('/Car Images')
  })

  it('doubles an embedded double quote', () => {
    expect(escapePqlLikeValue('/Cars"')).toBe('/Cars""')
  })

  it('backslash-escapes an embedded asterisk so it is not treated as a wildcard', () => {
    expect(escapePqlLikeValue('/A*B')).toBe('/A\\*B')
  })

  it('backslash-escapes an embedded question mark so it is not treated as a wildcard', () => {
    expect(escapePqlLikeValue('/A?B')).toBe('/A\\?B')
  })

  it('escapes a literal backslash before escaping wildcard characters, so the result does not re-escape them', () => {
    expect(escapePqlLikeValue('/A\\*B')).toBe('/A\\\\\\*B')
  })

  it('combines quote and wildcard escaping for a name containing both', () => {
    expect(escapePqlLikeValue('/A"*B')).toBe('/A""\\*B')
  })
})
