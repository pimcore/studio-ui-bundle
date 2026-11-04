/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface IdentifiedNode {
  id: string | number
}

/**
 * Whether a delete triggered on a node has to go through the batch path: always
 * for several elements, and also when pruning left a single element that is not
 * the clicked one - a selected folder whose selected child was right clicked.
 * Deleting the clicked child instead would leave the folder behind.
 */
export const needsBatchDelete = (clickedNode: IdentifiedNode, deletableNodes: IdentifiedNode[]): boolean => {
  if (deletableNodes.length > 1) {
    return true
  }

  return deletableNodes.length === 1 && String(deletableNodes[0].id) !== String(clickedNode.id)
}
