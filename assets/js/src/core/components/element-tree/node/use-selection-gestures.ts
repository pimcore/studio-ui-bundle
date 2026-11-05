/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type KeyboardEvent, useContext } from 'react'
import { isNil, isUndefined } from 'lodash'
import { TreeContext } from '../element-tree'
import { type TreeNodeProps } from './tree-node'
import { type TreeNodeInteractionState } from './use-tree-node-interaction'
import { buildOrderedNodes, resolveNodeIdRange } from '../utils/selection-range'

export interface UseSelectionGesturesReturnType {
  extendSelectionTo: (targetNodeId: string, additive?: boolean) => void
  toggleNode: () => void
  selectAllVisible: (event: KeyboardEvent) => void
}

/**
 * What the modifier gestures of a tree node do to the selection: ranges, toggles
 * and select all. None of them opens an element.
 */
export const useSelectionGestures = (
  node: TreeNodeProps,
  state: TreeNodeInteractionState
): UseSelectionGesturesReturnType => {
  const { nodesRefs, nodeOrder } = useContext(TreeContext)
  const { toggleSelection, selectRange, clearSelection, getAnchorId, isSelectionImplicit } = state
  const nodeId = node.id

  const getOrderedNodes = (): ReturnType<typeof buildOrderedNodes> => {
    if (isUndefined(nodeOrder) || isNil(nodesRefs)) {
      return []
    }

    return buildOrderedNodes(nodeOrder(), nodesRefs.current)
  }

  const findRenderedNode = (id: string): TreeNodeProps | undefined => {
    if (isNil(nodesRefs)) {
      return undefined
    }

    return Object.values(nodesRefs.current).find(entry => entry.node.id === id)?.node
  }

  /**
   * Whether a range may start at the anchor. One set by a modifier gesture always
   * counts. One that only comes from opening a node counts while the range stays
   * among that node's siblings - "open A, Shift+click D" in a folder - but not when
   * the opened node sits elsewhere, typically the editor the set is meant to be
   * dropped into.
   */
  const canRangeFromAnchor = (anchorId: string | undefined, targetNodeId: string): anchorId is string => {
    if (isUndefined(anchorId)) {
      return false
    }

    if (!isSelectionImplicit()) {
      return true
    }

    const anchor = findRenderedNode(anchorId)
    const target = findRenderedNode(targetNodeId)

    return !isUndefined(anchor) && !isUndefined(target) && String(anchor.parentId) === String(target.parentId)
  }

  /** Starts a set of its own at this node, without opening it. */
  const startSelectionHere = (): void => {
    clearSelection()
    toggleSelection()
  }

  /**
   * Extends the selection from the anchor to a target node, or starts a new one at
   * this node when there is no usable anchor. Never opens the element - selecting
   * several nodes must not open several editors.
   */
  const extendSelectionTo = (targetNodeId: string, additive: boolean = false): void => {
    const anchorId = getAnchorId()

    if (!canRangeFromAnchor(anchorId, targetNodeId)) {
      startSelectionHere()

      if (targetNodeId !== nodeId) {
        selectRange(resolveNodeIdRange(getOrderedNodes(), nodeId, targetNodeId))
      }

      return
    }

    selectRange(resolveNodeIdRange(getOrderedNodes(), anchorId, targetNodeId), additive)
  }

  /**
   * Adds or removes this node. A selection that is only the opened node is not a
   * set yet, so the first toggle starts one instead of pulling that node in.
   */
  const toggleNode = (): void => {
    if (isSelectionImplicit()) {
      startSelectionHere()
      return
    }

    toggleSelection()
  }

  /**
   * Selects every node the tree currently renders, the way Ctrl/Cmd + A selects all
   * rows of a list. Collapsed children are not rendered and stay out, and so does
   * the root, which can neither be moved nor deleted. The tree caps the selection.
   */
  const selectAllVisible = (event: KeyboardEvent): void => {
    event.preventDefault()

    if (isUndefined(nodeOrder) || isNil(nodesRefs)) {
      return
    }

    const nodeIds = nodeOrder()
      .map(internalKey => nodesRefs.current[internalKey]?.node)
      .filter(visibleNode => !isNil(visibleNode) && visibleNode.isRoot !== true)
      .map(visibleNode => visibleNode.id)

    selectRange(nodeIds)
  }

  return { extendSelectionTo, toggleNode, selectAllVisible }
}
