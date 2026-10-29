/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { sortGroupKeys } from './group-order'

const layout = (...ids: number[]): Array<{ id: number }> => ids.map((id) => ({ id }))

const groupKeys = (...ids: number[]): string[] => ids.map((id) => String(id))

describe('sortGroupKeys', () => {
  it('orders the group keys by their position in the layout', () => {
    expect(sortGroupKeys(groupKeys(3, 7, 11), layout(11, 3, 7))).toEqual(groupKeys(11, 3, 7))
  })

  it('keeps the configured order when it is the ascending numeric one', () => {
    expect(sortGroupKeys(groupKeys(11, 3, 7), layout(3, 7, 11))).toEqual(groupKeys(3, 7, 11))
  })

  it('puts groups the layout does not know behind the configured ones', () => {
    expect(sortGroupKeys(groupKeys(3, 7, 11), layout(11))).toEqual(groupKeys(11, 3, 7))
  })

  it('leaves the group keys alone while the layout is empty', () => {
    expect(sortGroupKeys(groupKeys(3, 11, 7), [])).toEqual(groupKeys(3, 11, 7))
  })

  it('returns an empty list for an empty value', () => {
    expect(sortGroupKeys([], layout(11, 3))).toEqual([])
  })
})
