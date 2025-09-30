/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'

export interface ContextMenuItemProvider {
  name: string
  priority?: number
  useHook?: (context?: any) => any
  getMenuItem: (context: any, hookResult?: any) => ItemType
}

export interface ContextMenuRegistryInterface {
  registerToSlot: (slotName: string, provider: ContextMenuItemProvider) => void
  getSlotProviders: (slotName: string) => ContextMenuItemProvider[]
}

@injectable()
export class ContextMenuRegistry implements ContextMenuRegistryInterface {
  private slots: Record<string, ContextMenuItemProvider[]> = {}

  registerToSlot (slotName: string, provider: ContextMenuItemProvider): void {
    if (this.slots[slotName] === undefined) {
      this.slots[slotName] = []
    }

    this.slots[slotName].push(provider)
  }

  getSlotProviders (slotName: string): ContextMenuItemProvider[] {
    if (this.slots[slotName] === undefined) {
      return []
    }

    return this.slots[slotName].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
  }
}