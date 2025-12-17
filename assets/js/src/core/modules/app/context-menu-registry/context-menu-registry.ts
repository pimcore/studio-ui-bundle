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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ContextMenuItemProvider {
  name: string
  priority?: number
  useMenuItem: (context: any) => ItemType | null
}

export type ContextMenuItemProviderUpdate = (provider: ContextMenuItemProvider) => ContextMenuItemProvider

export interface ContextMenuRegistryInterface {
  registerToSlot: (slotName: string, provider: ContextMenuItemProvider) => void
  overrideSlotProvider: (slotName: string, provider: ContextMenuItemProvider) => void
  updateSlotProvider: (slotName: string, providerName: string, updater: ContextMenuItemProviderUpdate) => void
  getSlotProviders: (slotName: string) => ContextMenuItemProvider[]
}

@injectable()
export class ContextMenuRegistry implements ContextMenuRegistryInterface {
  private slots: Record<string, ContextMenuItemProvider[]> = {}

  registerToSlot (slotName: string, provider: ContextMenuItemProvider): void {
    this.slots[slotName] = this.slots[slotName] ?? []

    if (this.slots[slotName].find(p => p.name === provider.name) !== undefined) {
      trackError(new GeneralError(`Provider with the name "${provider.name}" already exists in slot "${slotName}". Use the overrideSlotProvider method to override it`))
    }

    this.slots[slotName].push(provider)
  }

  overrideSlotProvider (slotName: string, provider: ContextMenuItemProvider): void {
    const { slotProviders, index } = this.getSlotItem(slotName, provider.name)
    slotProviders[index] = provider
  }

  updateSlotProvider (slotName: string, providerName: string, updater: ContextMenuItemProviderUpdate): void {
    const { slotProviders, index } = this.getSlotItem(slotName, providerName)
    slotProviders[index] = updater(slotProviders[index])
  }

  getSlotProviders (slotName: string): ContextMenuItemProvider[] {
    this.slots[slotName] = this.slots[slotName] ?? []
    return this.slots[slotName].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
  }

  private getSlotItem (slotName: string, providerName: string): { slotProviders: ContextMenuItemProvider[], index: number } {
    const slotProviders = this.getSlotProviders(slotName)
    const index = slotProviders.findIndex(p => p.name === providerName)

    if (index === -1) {
      trackError(new GeneralError(`No provider named "${providerName}" found in slot "${slotName}"`))
    }

    return { slotProviders, index }
  }
}
