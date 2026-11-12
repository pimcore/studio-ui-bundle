/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { toStringList } from './service-user-draft'

describe('toStringList', () => {
  it('keeps a list of names as it is, dropping empty entries', () => {
    expect(toStringList(['default', '', 'layout-b'])).toEqual(['default', 'layout-b'])
  })

  it('splits the comma-separated classic spelling instead of spreading it into characters', () => {
    expect(toStringList('de, en,')).toEqual(['de', 'en'])
  })

  it('reads null, undefined and other scalars as an empty list', () => {
    expect(toStringList(null)).toEqual([])
    expect(toStringList(undefined)).toEqual([])
    expect(toStringList(42)).toEqual([])
  })

  it('drops non-string entries of a list', () => {
    expect(toStringList(['de', 7, null])).toEqual(['de'])
  })
})
