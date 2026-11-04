/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { planSetSort, resolveSortAnchor, resolveSortPositions, type SortPosition } from './sort-positions'

/**
 * What the backend does with each patched element: take it out of the siblings
 * and insert it at the index, the others keep their order around it.
 */
const applyLikeBackend = (siblings: string[], positions: SortPosition[], pageOffset: number = 0): string[] => {
  let list = [...siblings]
  for (const { id, index } of positions) {
    list = list.filter(sibling => sibling !== id)
    list.splice(index - pageOffset, 0, id)
  }
  return list
}

const sort = (siblings: string[], moved: string[], target: string, edge: 'top' | 'bottom'): string[] => {
  const anchorId = resolveSortAnchor(siblings, target, edge, moved)
  return applyLikeBackend(siblings, resolveSortPositions({ siblingIds: siblings, pageOffset: 0, movedIds: moved, anchorId }))
}

describe('resolveSortPositions', () => {
  const siblings = ['a', 'b', 'c', 'd', 'e']

  it('moves a set from above the target in front of it', () => {
    // consecutive indexes from the drop position would give c d a e b here
    expect(sort(siblings, ['a', 'b'], 'd', 'top')).toEqual(['c', 'a', 'b', 'd', 'e'])
  })

  it('moves a set from below the target in front of it', () => {
    expect(sort(siblings, ['d', 'e'], 'b', 'top')).toEqual(['a', 'd', 'e', 'b', 'c'])
  })

  it('places a set after a target, before its next sibling', () => {
    expect(sort(siblings, ['a', 'b'], 'd', 'bottom')).toEqual(['c', 'd', 'a', 'b', 'e'])
  })

  it('appends a set dropped after the last sibling', () => {
    expect(sort(siblings, ['a', 'c'], 'e', 'bottom')).toEqual(['b', 'd', 'e', 'a', 'c'])
  })

  it('keeps the order the set is given in, not the order it had', () => {
    expect(sort(siblings, ['e', 'a'], 'c', 'top')).toEqual(['b', 'e', 'a', 'c', 'd'])
  })

  it('handles a set spread around the target', () => {
    expect(sort(siblings, ['a', 'e'], 'c', 'bottom')).toEqual(['b', 'c', 'a', 'e', 'd'])
  })

  it('inserts elements coming from another parent', () => {
    expect(sort(siblings, ['x', 'y'], 'c', 'top')).toEqual(['a', 'b', 'x', 'y', 'c', 'd', 'e'])
  })

  it('adds the page offset to every index', () => {
    const positions = resolveSortPositions({ siblingIds: siblings, pageOffset: 30, movedIds: ['a', 'b'], anchorId: 'd' })

    expect(positions).toEqual([{ id: 'a', index: 32 }, { id: 'b', index: 32 }])
    expect(applyLikeBackend(siblings, positions, 30)).toEqual(['c', 'a', 'b', 'd', 'e'])
  })

  it('returns nothing when the anchor is not a loaded sibling', () => {
    expect(resolveSortPositions({ siblingIds: siblings, pageOffset: 0, movedIds: ['a'], anchorId: 'z' })).toEqual([])
  })
})

describe('resolveSortAnchor', () => {
  it('uses the target for its top edge', () => {
    expect(resolveSortAnchor(['a', 'b', 'c'], 'b', 'top', ['a'])).toBe('b')
  })

  it('skips moved siblings below the bottom edge', () => {
    expect(resolveSortAnchor(['a', 'b', 'c', 'd'], 'a', 'bottom', ['b', 'c'])).toBe('d')
  })

  it('is undefined after the last sibling', () => {
    expect(resolveSortAnchor(['a', 'b'], 'b', 'bottom', ['a'])).toBeUndefined()
  })
})

describe('planSetSort', () => {
  const parent = { id: '1', childrenIds: ['10', '11', '12', '13'], page: 1 }
  const element = (id: string, parentId: string = '1'): { id: string, parentId: string } => ({ id, parentId })

  it('attaches the replayed index to every element', () => {
    expect(planSetSort({ parent, pageSize: 30, elements: [element('10'), element('11')], targetId: '13', edge: 'top' }))
      .toEqual([{ id: '10', parentId: '1', index: 2 }, { id: '11', parentId: '1', index: 2 }])
  })

  it('offsets the indexes by the pages before the shown one', () => {
    const [first] = planSetSort({ parent: { ...parent, page: 3 }, pageSize: 30, elements: [element('99', '2')], targetId: '10', edge: 'top' })

    expect(first.index).toBe(60)
  })

  it('refuses a level filtered by a search term', () => {
    expect(planSetSort({ parent: { ...parent, searchTerm: 'foo' }, pageSize: 30, elements: [element('10'), element('11')], targetId: '13', edge: 'top' })).toEqual([])
  })

  it('refuses a set member from another page of the same parent', () => {
    expect(planSetSort({ parent, pageSize: 30, elements: [element('10'), element('77')], targetId: '13', edge: 'top' })).toEqual([])
  })

  it('accepts members from other parents', () => {
    expect(planSetSort({ parent, pageSize: 30, elements: [element('10'), element('77', '5')], targetId: '13', edge: 'top' })).toHaveLength(2)
  })

  it('refuses a target that is not a loaded sibling', () => {
    expect(planSetSort({ parent, pageSize: 30, elements: [element('10')], targetId: '55', edge: 'top' })).toEqual([])
  })
})
