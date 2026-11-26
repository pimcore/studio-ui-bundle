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

// Regression tests for pimcore/platform-version#688: per-brick-type limits
// (`config.limits`) must be enforced by the editor, the way core enforces
// them when rendering (Areablock::loop() skips over-limit bricks).
describe('configUtils.getTypeLimit', () => {
  it('returns the configured limit for a brick type', () => {
    expect(configUtils.getTypeLimit({ limits: { 'demo-brick': 1 } }, 'demo-brick')).toBe(1)
  })

  it('returns undefined for a type without a configured limit', () => {
    expect(configUtils.getTypeLimit({ limits: { 'demo-brick': 1 } }, 'text')).toBeUndefined()
  })

  it('returns undefined when no limits config is set', () => {
    expect(configUtils.getTypeLimit({}, 'demo-brick')).toBeUndefined()
    expect(configUtils.getTypeLimit(undefined, 'demo-brick')).toBeUndefined()
  })
})

describe('configUtils.isTypeLimitReached', () => {
  it('is false for a type without a configured limit', () => {
    expect(configUtils.isTypeLimitReached({}, 'demo-brick', 5)).toBe(false)
    expect(configUtils.isTypeLimitReached(undefined, 'demo-brick', 5)).toBe(false)
  })

  it('is false while the usage count is below the limit', () => {
    expect(configUtils.isTypeLimitReached({ limits: { 'demo-brick': 2 } }, 'demo-brick', 1)).toBe(false)
  })

  it('is true once the usage count equals the limit', () => {
    expect(configUtils.isTypeLimitReached({ limits: { 'demo-brick': 1 } }, 'demo-brick', 1)).toBe(true)
  })

  it('is true when the usage count exceeds the limit', () => {
    expect(configUtils.isTypeLimitReached({ limits: { 'demo-brick': 1 } }, 'demo-brick', 2)).toBe(true)
  })

  it('treats a limit of 0 as "never addable"', () => {
    expect(configUtils.isTypeLimitReached({ limits: { 'demo-brick': 0 } }, 'demo-brick', 0)).toBe(true)
  })
})

describe('configUtils.getTypeUsageCounts', () => {
  it('counts how often each brick type occurs', () => {
    expect(configUtils.getTypeUsageCounts(['a', 'b', 'a', 'a'])).toEqual({ a: 3, b: 1 })
  })

  it('ignores null types and returns an empty record for no elements', () => {
    expect(configUtils.getTypeUsageCounts(['a', null, 'a'])).toEqual({ a: 2 })
    expect(configUtils.getTypeUsageCounts([])).toEqual({})
  })
})
