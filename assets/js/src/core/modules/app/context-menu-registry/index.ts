/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export { ContextMenuRegistry, type ContextMenuItemProvider, type ContextMenuRegistryInterface } from './context-menu-registry'
export { useContextMenuSlot } from './use-context-menu-slot'
export { 
  contextMenuConfig, 
  type ContextMenuSlotConfig, 
  type ContextMenuSlotTypes,
  type ContextMenuSlotTarget,
  type ContextMenuSlotContext,
  type ContextMenuSlotPayload
} from './context-menu-config'