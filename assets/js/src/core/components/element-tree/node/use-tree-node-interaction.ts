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
import { useSelectionGestures } from './use-selection-gestures'

/**
 * The selection and expansion part of the node state, as returned by
 * useElementTreeNode.
 */
export interface TreeNodeInteractionState {
  isExpanded: boolean
  setExpanded: (expanded: boolean) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  toggleSelection: () => void
  selectRange: (nodeIds: string[], additive?: boolean) => void
  clearSelection: () => void
  setActive: () => void
  getSelectedIds: () => string[]
  getAnchorId: () => string | undefined
  isSelectionImplicit: () => boolean
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
  const { onSelect, onRightClick, nodesRefs, nodeOrder, selectionMode } = useContext(TreeContext)
  // Without the opt in, the modifier gestures fall back to their plain meaning.
  const isMultiSelect = selectionMode === 'multiple'
  const {
    isExpanded,
    setExpanded,
    setSelectedIds,
    clearSelection,
    setActive,
    getSelectedIds
  } = state

  const nodeId = node.id
  const { extendSelectionTo, toggleNode, selectAllVisible } = useSelectionGestures(node, state)

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

    if (event.shiftKey && isMultiSelect) {
      extendSelectionTo(targetNode.node.id)
    }
  }

  const focusSibling = (event: KeyboardEvent, offset: number | 'first' | 'last'): void => {
    if (isUndefined(nodeOrder)) {
      return
    }

    const order = nodeOrder()

    if (offset === 'first' || offset === 'last') {
      focusNode(event, offset === 'first' ? order[0] : order[order.length - 1])
      return
    }

    const targetIndex = order.indexOf(node.internalKey) + offset

    focusNode(event, targetIndex >= 0 && targetIndex < order.length ? order[targetIndex] : undefined)
  }

  /**
   * Moves focus up to the node this one hangs under. The refs are keyed by
   * internal key, so the parent is found by its element id.
   */
  const focusParent = (event: KeyboardEvent): void => {
    if (isNil(nodesRefs) || isUndefined(node.parentId)) {
      return
    }

    const parent = Object.values(nodesRefs.current)
      .find((entry) => String(entry.node.id) === String(node.parentId))

    focusNode(event, parent?.node.internalKey)
  }

  const onClick = (event: MouseEvent): void => {
    if (!isMultiSelect) {
      activateNode()
      return
    }

    if (event.shiftKey) {
      // Suppress the text selection the browser paints across a shift range.
      event.preventDefault()
      extendSelectionTo(nodeId, event.ctrlKey || event.metaKey)
      return
    }

    if (event.ctrlKey || event.metaKey) {
      toggleNode()
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

  /** Ctrl/Cmd + Space toggles like a modifier click, Ctrl/Cmd + A selects everything. */
  const onSelectionKey = (event: KeyboardEvent): void => {
    if (!isMultiSelect || !(event.ctrlKey || event.metaKey)) {
      return
    }

    if (event.key === ' ') {
      event.preventDefault()
      toggleNode()
      return
    }

    if (event.key.toLowerCase() === 'a' && !event.shiftKey && !event.altKey) {
      selectAllVisible(event)
    }
  }

  const keyHandlers: Partial<Record<string, (event: KeyboardEvent) => void>> = {
    Enter: () => { activateNode() },
    Escape: () => { clearSelection() },
    // A closed node opens, an open one steps into its children.
    ArrowRight: (event) => {
      event.preventDefault()

      if (node.hasChildren === true && !isExpanded) {
        setExpanded(true)
      } else {
        focusSibling(event, 1)
      }
    },
    // An open node closes, a closed one steps back out to its parent.
    ArrowLeft: (event) => {
      event.preventDefault()

      if (isExpanded) {
        setExpanded(false)
      } else {
        focusParent(event)
      }
    },
    ArrowDown: (event) => { focusSibling(event, 1) },
    ArrowUp: (event) => { focusSibling(event, -1) },
    Home: (event) => { focusSibling(event, 'first') },
    End: (event) => { focusSibling(event, 'last') }
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    onSelectionKey(event)
    keyHandlers[event.key]?.(event)
  }

  return { onClick, onContextMenu, onKeyDown }
}
