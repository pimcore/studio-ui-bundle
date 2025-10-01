/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { type ContextMenuRegistry } from './context-menu-registry'
import { type TreeContextMenuProps, type DocumentEditorContextMenuProps } from './context-types'

// Overloaded hook signatures for each specific slot
export function useContextMenuSlot (slotName: 'document.tree', context: TreeContextMenuProps): ItemType[]
export function useContextMenuSlot (slotName: 'document.tree.advanced', context: TreeContextMenuProps): ItemType[]
export function useContextMenuSlot (slotName: 'document.editor.toolbar', context: DocumentEditorContextMenuProps): ItemType[]
export function useContextMenuSlot (slotName: 'asset.tree', context: TreeContextMenuProps): ItemType[]
export function useContextMenuSlot (slotName: 'data-object.tree', context: TreeContextMenuProps): ItemType[]
export function useContextMenuSlot (slotName: string, context: any): ItemType[]
export function useContextMenuSlot (
  slotName: string,
  context: any
): ItemType[] {
  const contextMenuRegistry = container.get<ContextMenuRegistry>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
  const providers = contextMenuRegistry.getSlotProviders(slotName)

  return providers.map((provider) => {
    // Generate the menu item directly
    return provider.useMenuItem(context)
  })
}
