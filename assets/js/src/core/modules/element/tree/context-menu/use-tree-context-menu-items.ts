/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useElementTreeOptional } from '@Pimcore/components/element-tree/hooks/use-element-tree-optional'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { type TreeContextMenuProps } from '@Pimcore/modules/app/context-menu-registry/context-types'
import { toMultiSelectionMenuItems } from './multi-selection-menu-items'

/**
 * Context menu entries of a tree node.
 *
 * With several nodes selected and the right clicked node among them, the menu is
 * reduced to the actions that handle a set. Right clicking outside the selection
 * takes that node over first, so the menu is a normal single element menu again.
 */
export const useTreeContextMenuItems = (slotName: string, node: TreeNodeProps): ItemType[] => {
  const contextMenuProps: TreeContextMenuProps = {
    target: node,
    onComplete: () => {}
  }

  const items = useContextMenuSlot(slotName, contextMenuProps)
  const { getSelectedNodes } = useElementTreeOptional()

  const selectedNodes = getSelectedNodes()
  const isMultiSelection = selectedNodes.length > 1 &&
    selectedNodes.some(selected => String(selected.id) === String(node.id))

  return isMultiSelection ? toMultiSelectionMenuItems(items) : items
}
