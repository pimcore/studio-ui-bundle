/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'

export interface OrderedNode {
  internalKey: string
  id: string
}

/**
 * Structural subset of the node refs the tree keeps for keyboard navigation.
 * Typed locally to keep this helper free of component imports.
 */
type NodeRefs = Record<string, { node: { id: string } } | undefined>

/**
 * Brings the registered node refs into the visible top to bottom order the tree
 * renders them in, which is the order a range selection has to follow.
 */
export const buildOrderedNodes = (nodeOrder: string[], nodeRefs: NodeRefs): OrderedNode[] => {
  return nodeOrder
    .filter(internalKey => !isNil(nodeRefs[internalKey]))
    .map(internalKey => ({ internalKey, id: nodeRefs[internalKey]!.node.id }))
}

/**
 * Resolves the ids between the anchor and the clicked node, both included.
 *
 * Falls back to the clicked node alone when there is no anchor yet or when
 * either end is no longer rendered - a range across nodes the user cannot see
 * would be guesswork.
 */
export const resolveNodeIdRange = (
  orderedNodes: OrderedNode[],
  anchorNodeId: string | undefined,
  targetNodeId: string
): string[] => {
  if (isUndefined(anchorNodeId)) {
    return [targetNodeId]
  }

  if (anchorNodeId === targetNodeId) {
    return [targetNodeId]
  }

  const anchorIndex = orderedNodes.findIndex(node => node.id === anchorNodeId)
  const targetIndex = orderedNodes.findIndex(node => node.id === targetNodeId)

  if (anchorIndex === -1 || targetIndex === -1) {
    return [targetNodeId]
  }

  const startIndex = Math.min(anchorIndex, targetIndex)
  const endIndex = Math.max(anchorIndex, targetIndex)

  return orderedNodes.slice(startIndex, endIndex + 1).map(node => node.id)
}
