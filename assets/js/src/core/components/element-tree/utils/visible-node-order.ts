/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

/**
 * Structural subset of the node refs the tree registers while rendering.
 */
type NodeRefs = Record<string, { el?: HTMLElement } | undefined>

// Node.DOCUMENT_POSITION_* as literals, so this helper does not depend on the
// DOM globals being present when it is imported.
const documentPositionPreceding = 2
const documentPositionFollowing = 4

const compareDocumentOrder = (first: HTMLElement, second: HTMLElement): number => {
  if (first === second) {
    return 0
  }

  const position = first.compareDocumentPosition(second)

  // Contained nodes come with the FOLLOWING bit set, which is what we want: a
  // parent row is rendered before the list holding its children.
  if ((position & documentPositionFollowing) !== 0) {
    return -1
  }

  if ((position & documentPositionPreceding) !== 0) {
    return 1
  }

  return 0
}

/**
 * Internal keys of the currently rendered nodes, top to bottom as the user sees
 * them.
 *
 * The order is taken from the DOM rather than from the internal keys: a key is a
 * path of element ids (`0-1-83-940`), so sorting keys yields id order, which has
 * nothing to do with the order the server sorted the children into. Document
 * order is the visible order by definition and stays correct for every sorting,
 * page and filter.
 */
export const buildVisibleNodeOrder = (nodeRefs: NodeRefs): string[] => {
  return Object.keys(nodeRefs)
    .filter(internalKey => {
      const element = nodeRefs[internalKey]?.el

      // Refs of unmounted nodes are removed on cleanup, but a detached element
      // cannot be compared meaningfully, so it is dropped defensively.
      return !isNil(element) && element.isConnected
    })
    .sort((first, second) => compareDocumentOrder(nodeRefs[first]!.el!, nodeRefs[second]!.el!))
}
