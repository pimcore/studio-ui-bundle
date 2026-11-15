/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isTargetInsideDraggedSet, toMovableElements, toTopmostElements } from './drop-target-validation'

// 1 - 10 - 11 - 12
//   \ 20 - 21
//   \ 30
const parentOf: Record<string, string | undefined> = {
  10: '1',
  11: '10',
  12: '11',
  20: '1',
  21: '20',
  30: '1'
}

const getAncestorIds = (nodeId: string): string[] => {
  const ancestorIds: string[] = []
  let currentId = parentOf[nodeId]

  while (currentId !== undefined) {
    ancestorIds.push(currentId)
    currentId = parentOf[currentId]
  }

  return ancestorIds
}

const element = (id: string): { id: string, parentId?: string } => ({ id, parentId: parentOf[id] })

describe('isTargetInsideDraggedSet', () => {
  it('refuses the target being one of the dragged elements', () => {
    expect(isTargetInsideDraggedSet('10', [element('10')], getAncestorIds)).toBe(true)
  })

  it('refuses a target inside a dragged element, however deep', () => {
    expect(isTargetInsideDraggedSet('12', [element('10')], getAncestorIds)).toBe(true)
  })

  it('allows an unrelated target', () => {
    expect(isTargetInsideDraggedSet('21', [element('10')], getAncestorIds)).toBe(false)
  })

  it('allows the parent of a dragged element as target', () => {
    expect(isTargetInsideDraggedSet('1', [element('10')], getAncestorIds)).toBe(false)
  })
})

describe('toTopmostElements', () => {
  it('drops elements whose parent is dragged as well', () => {
    const result = toTopmostElements([element('10'), element('11')], getAncestorIds)

    expect(result.map(item => item.id)).toEqual(['10'])
  })

  it('drops deeper descendants too', () => {
    const result = toTopmostElements([element('10'), element('12')], getAncestorIds)

    expect(result.map(item => item.id)).toEqual(['10'])
  })

  it('keeps siblings and unrelated branches', () => {
    const result = toTopmostElements([element('10'), element('20')], getAncestorIds)

    expect(result.map(item => item.id)).toEqual(['10', '20'])
  })

  it('falls back to the tree when the element carries no parent', () => {
    const result = toTopmostElements([{ id: '10' }, { id: '11' }], getAncestorIds)

    expect(result.map(item => item.id)).toEqual(['10'])
  })
})

describe('toMovableElements', () => {
  it('returns nothing when the target lies inside the set', () => {
    expect(toMovableElements('11', [element('10'), element('20')], getAncestorIds)).toEqual([])
  })

  it('returns the topmost elements for a valid target', () => {
    const result = toMovableElements('30', [element('10'), element('11'), element('20')], getAncestorIds)

    expect(result.map(item => item.id)).toEqual(['10', '20'])
  })

  it('refuses a target that sits inside any dragged element', () => {
    // 21 is a child of the dragged 20, so the whole drop is refused.
    expect(toMovableElements('21', [element('10'), element('20')], getAncestorIds)).toEqual([])
  })

  it('returns nothing for an empty set', () => {
    expect(toMovableElements('30', [], getAncestorIds)).toEqual([])
  })
})
