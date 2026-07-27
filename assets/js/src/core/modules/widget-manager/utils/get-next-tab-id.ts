/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Node } from 'flexlayout-react'
import { isUndefined } from 'lodash'

/**
 * Returns the id of the tab that should be selected after `node` is closed
 * (the neighbouring sibling), or undefined when it has no siblings.
 */
export const getNextTabId = (node: Node): string | undefined => {
  const parent = node.getParent()

  if (isUndefined(parent)) {
    return undefined
  }

  const siblings = parent.getChildren()
  const closedIndex = siblings.findIndex((child) => child.getId() === node.getId())

  if (siblings.length <= 1) {
    return undefined
  }

  const nextIndex = closedIndex < siblings.length - 1 ? closedIndex + 1 : closedIndex - 1
  return siblings[nextIndex].getId()
}
