/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface SortPosition {
  id: string
  index: number
}

export interface ResolveSortPositionsProps {
  /** The parent's children in tree order, as far as they are loaded (one page). */
  siblingIds: string[]
  /** How many siblings come before the loaded page. */
  pageOffset: number
  /** The set, in the order it should end up in. */
  movedIds: string[]
  /** The sibling the set ends up in front of; undefined appends it after the last loaded sibling. */
  anchorId?: string
}

/**
 * The index to send for each element of a sorted set.
 *
 * The backend applies the elements one after the other: each one is taken out of
 * its siblings and inserted at the given index, and the others are renumbered
 * around it. An index therefore only means something against the list as it is
 * at that step - consecutive indexes from the drop position end up scrambled as
 * soon as a moved element sat above the target. The steps are replayed here
 * instead: every element goes right in front of the anchor, in order, which
 * leaves the whole set together and in order in front of it.
 *
 * Returns nothing when the anchor is not among the loaded siblings, since no index
 * can be derived for it then.
 */
export const resolveSortPositions = ({ siblingIds, pageOffset, movedIds, anchorId }: ResolveSortPositionsProps): SortPosition[] => {
  if (anchorId !== undefined && !siblingIds.includes(anchorId)) {
    return []
  }

  let siblings = [...siblingIds]

  return movedIds.map(id => {
    siblings = siblings.filter(siblingId => siblingId !== id)
    const position = anchorId === undefined ? siblings.length : siblings.indexOf(anchorId)
    siblings.splice(position, 0, id)

    return { id, index: pageOffset + position }
  })
}

/**
 * The sibling a set dropped onto the given edge of a target ends up in front of:
 * the target itself for its top edge, otherwise the next sibling that is not part
 * of the set. Undefined means the set goes after the last loaded sibling.
 */
export const resolveSortAnchor = (siblingIds: string[], targetId: string, edge: 'top' | 'bottom', movedIds: string[]): string | undefined => {
  if (edge === 'top') {
    return targetId
  }

  const moved = new Set(movedIds)

  return siblingIds
    .slice(siblingIds.indexOf(targetId) + 1)
    .find(siblingId => !moved.has(siblingId))
}

export interface SortSetElement {
  id: number | string
  parentId?: number | string | null
}

export interface PlanSetSortProps<T extends SortSetElement> {
  /** The parent the set is sorted into, as the tree holds it. */
  parent: { id: string, childrenIds?: string[], page?: number, searchTerm?: string }
  pageSize: number
  /** The set, in the order it should end up in. */
  elements: T[]
  targetId: string
  edge: 'top' | 'bottom'
}

/**
 * Indexes for sorting a set next to a target, or nothing when they cannot be
 * derived from what the tree shows: a filtered level hides siblings, and a set
 * member from another page of the same parent sits at an unknown position.
 */
export const planSetSort = <T extends SortSetElement>({ parent, pageSize, elements, targetId, edge }: PlanSetSortProps<T>): Array<T & { index: number }> => {
  const siblingIds = parent.childrenIds ?? []

  if ((parent.searchTerm ?? '') !== '' || !siblingIds.includes(targetId)) {
    return []
  }

  const isOnOtherPage = elements.some(element =>
    String(element.parentId) === parent.id && !siblingIds.includes(String(element.id))
  )

  if (isOnOtherPage) {
    return []
  }

  const movedIds = elements.map(element => String(element.id))
  const positions = resolveSortPositions({
    siblingIds,
    pageOffset: ((parent.page ?? 1) - 1) * pageSize,
    movedIds,
    anchorId: resolveSortAnchor(siblingIds, targetId, edge, movedIds)
  })

  return positions.length === elements.length
    ? elements.map((element, position) => ({ ...element, index: positions[position].index }))
    : []
}
