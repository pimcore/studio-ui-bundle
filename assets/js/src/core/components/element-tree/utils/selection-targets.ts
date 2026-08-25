/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The nodes an action triggered on a single node should apply to.
 *
 * Acting on the selection only makes sense when the node is part of it - a right
 * click or a drag on something outside the selection is about that node, not about
 * whatever happens to be selected elsewhere.
 */
export const resolveActionTargets = <T extends { id: string | number }>(
  node: T,
  selectedNodes: readonly T[]
): T[] => {
  const isPartOfSelection = selectedNodes.some(selected => String(selected.id) === String(node.id))

  if (!isPartOfSelection || selectedNodes.length < 2) {
    return [node]
  }

  return [...selectedNodes]
}
