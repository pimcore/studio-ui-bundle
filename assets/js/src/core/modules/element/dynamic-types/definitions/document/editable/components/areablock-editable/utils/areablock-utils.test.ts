/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { configUtils } from './areablock-utils'
import { type AreaType } from '../areablock-editable'

// `config.types` is delivered pre-sorted by the backend according to the
// `sorting` config — here: c, a, b (with sortIndex), d unsorted at the end
const sortedTypes: AreaType[] = [
  { name: 'Brick C', type: 'c', sortIndex: 0 },
  { name: 'Brick A', type: 'a', sortIndex: 1 },
  { name: 'Brick B', type: 'b', sortIndex: 2 },
  { name: 'Brick D', type: 'd' }
]

describe('configUtils.getGroupedAreaTypes', () => {
  it('returns the types in their delivered order when no group config is set', () => {
    const result = configUtils.getGroupedAreaTypes({ types: sortedTypes })

    expect(result).toEqual(sortedTypes)
  })

  it('keeps the delivered (sorted) type order within a group instead of the group config order', () => {
    const result = configUtils.getGroupedAreaTypes({
      types: sortedTypes,
      group: { 'My Group': ['a', 'b', 'c'] }
    })

    expect(result).toEqual({
      'My Group': [
        expect.objectContaining({ type: 'c' }),
        expect.objectContaining({ type: 'a' }),
        expect.objectContaining({ type: 'b' })
      ]
    })
  })

  it('keeps the group declaration order across groups', () => {
    const result = configUtils.getGroupedAreaTypes({
      types: sortedTypes,
      group: { 'Group One': ['b'], 'Group Two': ['a', 'c'] }
    })

    expect(Object.keys(result)).toEqual(['Group One', 'Group Two'])
  })

  it('ignores duplicate and unknown type ids and omits empty groups', () => {
    const result = configUtils.getGroupedAreaTypes({
      types: sortedTypes,
      group: {
        'My Group': ['a', 'a', 'unknown'],
        'Empty Group': ['also-unknown']
      }
    })

    expect(result).toEqual({
      'My Group': [expect.objectContaining({ type: 'a' })]
    })
  })
})
