/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type KeyboardEvent, type MouseEvent, useContext } from 'react'
import { isNil, isUndefined } from 'lodash'
import { TreeContext } from '../element-tree'
import { type TreeNodeProps } from './tree-node'
import { buildOrderedNodes, resolveNodeIdRange } from '../utils/selection-range'

/**
 * The selection and expansion part of the node state, as returned by
 * useElementTreeNode.
 */
export interface TreeNodeInteractionState {
  setExpanded: (expanded: boolean) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  toggleSelection: () => void
  selectRange: (nodeIds: string[], additive?: boolean) => void
  clearSelection: () => void
  setActive: () => void
  getSelectedIds: () => string[]
  getAnchorId: () => string | undefined
}

export interface UseTreeNodeInteractionReturnType {
  onClick: (event: MouseEvent) => void
  onContextMenu: (event: MouseEvent) => void
  onKeyDown: (event: KeyboardEvent) => void
}

/**
 * Pointer and keyboard behaviour of a single tree node.
 *
 * Selecting and opening are two different things: a plain click activates one
 * node and opens it, while the modifier gestures only change the selection.
 */
export const useTreeNodeInteraction = (
  node: TreeNodeProps,
  state: TreeNodeInteractionState
): UseTreeNodeInteractionReturnType => {
  const { onSelect, onRightClick, nodesRefs, nodeOrder } = useContext(TreeContext)
  const {
    setExpanded,
    setSelectedIds,
    toggleSelection,
    selectRange,
    clearSelection,
    setActive,
    getSelectedIds,
    getAnchorId
  } = state

  const nodeId = node.id

  const getOrderedNodes = (): ReturnType<typeof buildOrderedNodes> => {
    if (isUndefined(nodeOrder) || isNil(nodesRefs)) {
      return []
    }

    return buildOrderedNodes(nodeOrder(), nodesRefs.current)
  }

  /**
   * Plain activation: the node becomes the only selected node, becomes the active
   * node and gets opened. Unchanged single select behaviour.
   */
  const activateNode = (): void => {
    setSelectedIds([nodeId])
    setActive()

    if (!isUndefined(onSelect)) {
      onSelect(node)
    }
  }

  /**
   * Extends the selection from the anchor to a target node. Never opens the
   * element - selecting several nodes must not open several editors.
   */
  const extendSelectionTo = (targetNodeId: string, additive: boolean = false): void => {
    if (isUndefined(getAnchorId())) {
      // The first extension starts the range at this node.
      setSelectedIds([nodeId])
    }

    selectRange(resolveNodeIdRange(getOrderedNodes(), getAnchorId() ?? nodeId, targetNodeId), additive)
  }

  const focusNode = (event: KeyboardEvent, targetInternalKey: string | undefined): void => {
    event.preventDefault()

    if (isUndefined(targetInternalKey) || isNil(nodesRefs)) {
      return
    }

    const targetNode = nodesRefs.current[targetInternalKey]

    if (isNil(targetNode)) {
      return
    }

    targetNode.el.focus()

    if (event.shiftKey) {
      extendSelectionTo(targetNode.node.id)
    }
  }

  const focusSibling = (event: KeyboardEvent, offset: number): void => {
    if (isUndefined(nodeOrder)) {
      return
    }

    const order = nodeOrder()
    const targetIndex = order.indexOf(node.internalKey) + offset

    focusNode(event, targetIndex >= 0 && targetIndex < order.length ? order[targetIndex] : undefined)
  }

  const onClick = (event: MouseEvent): void => {
    if (event.shiftKey) {
      // Suppress the text selection the browser paints across a shift range.
      event.preventDefault()
      extendSelectionTo(nodeId, event.ctrlKey || event.metaKey)
      return
    }

    if (event.ctrlKey || event.metaKey) {
      toggleSelection()
      return
    }

    activateNode()
  }

  const onContextMenu = (event: MouseEvent): void => {
    // Acting on a node outside the selection would be surprising, so the menu
    // takes that node over; right clicking inside the selection keeps it intact.
    if (!getSelectedIds().includes(nodeId)) {
      setSelectedIds([nodeId])
    }

    if (!isUndefined(onRightClick)) {
      onRightClick(event, node)
    }
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      activateNode()
    }

    // Ctrl/Cmd + Space is the keyboard equivalent of a modifier click.
    if (event.key === ' ' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      toggleSelection()
    }

    if (event.key === 'Escape') {
      clearSelection()
    }

    if (event.key === 'ArrowRight') {
      setExpanded(true)
    }

    if (event.key === 'ArrowLeft') {
      setExpanded(false)
    }

    if (event.key === 'ArrowDown') {
      focusSibling(event, 1)
    }

    if (event.key === 'ArrowUp') {
      focusSibling(event, -1)
    }
  }

  return { onClick, onContextMenu, onKeyDown }
}
