/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/** Resolves the ancestor ids of a node, closest first. */
export type AncestorIdsResolver = (nodeId: string) => string[]

export interface DraggedElement {
  id: number | string
  parentId?: number | string | null
}

/**
 * True when the drop target is one of the dragged elements or sits inside one of
 * them. Moving a set into its own subtree has no meaning, so the whole drop is
 * refused rather than partially applied.
 */
export const isTargetInsideDraggedSet = (
  targetId: number | string,
  elements: readonly DraggedElement[],
  getAncestorIds: AncestorIdsResolver
): boolean => {
  const draggedIds = new Set(elements.map(element => String(element.id)))

  if (draggedIds.has(String(targetId))) {
    return true
  }

  return getAncestorIds(String(targetId)).some(ancestorId => draggedIds.has(ancestorId))
}

/**
 * Reduces a set to the elements that are not contained in another element of the
 * same set.
 *
 * A folder takes its children with it, so moving a selected child separately
 * would either be a no op or fail once its parent has already moved.
 */
export const toTopmostElements = <T extends DraggedElement>(
  elements: readonly T[],
  getAncestorIds: AncestorIdsResolver
): T[] => {
  const draggedIds = new Set(elements.map(element => String(element.id)))

  return elements.filter(element => {
    const parentId = element.parentId

    // The direct parent is known from the element itself, the rest from the tree.
    if (parentId !== undefined && parentId !== null && draggedIds.has(String(parentId))) {
      return false
    }

    return !getAncestorIds(String(element.id)).some(ancestorId => draggedIds.has(ancestorId))
  })
}

/**
 * The elements a move should actually be executed with: nothing when the target
 * lies inside the set, otherwise the topmost elements of the set.
 */
export const toMovableElements = <T extends DraggedElement>(
  targetId: number | string,
  elements: readonly T[],
  getAncestorIds: AncestorIdsResolver
): T[] => {
  if (elements.length === 0 || isTargetInsideDraggedSet(targetId, elements, getAncestorIds)) {
    return []
  }

  return toTopmostElements(elements, getAncestorIds)
}
