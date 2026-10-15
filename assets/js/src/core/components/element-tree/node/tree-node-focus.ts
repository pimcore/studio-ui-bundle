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

/** All focusable tree node elements in the tree container, in visual DOM order. */
function getVisibleNodes (from: HTMLElement): HTMLElement[] {
  const tree = from.closest('.tree')
  if (isNil(tree)) return []
  return Array.from(tree.querySelectorAll<HTMLElement>('.tree-node__content-inner'))
}

export function moveFocus (current: HTMLElement, offset: number | 'first' | 'last'): void {
  const nodes = getVisibleNodes(current)
  const idx = nodes.indexOf(current)
  if (idx === -1) return
  const target = offset === 'first' ? 0 : offset === 'last' ? nodes.length - 1 : idx + offset
  if (target >= 0 && target < nodes.length) { nodes[target].focus() }
}

export function moveFocusToParent (current: HTMLElement): void {
  const ownTreeNode = current.closest('.tree-node')
  const parentTreeNode = ownTreeNode?.parentElement?.closest('.tree-node')
  const parentInner = parentTreeNode?.querySelector<HTMLElement>('.tree-node__content-inner')
  parentInner?.focus()
}
