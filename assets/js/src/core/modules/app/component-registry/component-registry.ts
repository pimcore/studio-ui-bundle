/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { injectable } from 'inversify'
import type React from 'react'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { ComponentType, componentConfig } from './component-ids'
import { isUndefined } from 'lodash'

interface ComponentRegistryEntry<T> {
  name: string
  component: React.ComponentType<T>
  priority?: number // Optional priority for slot components
}

export interface ComponentRegistryConfigEntry {
  type: ComponentType
}

export interface ComponentRegistryInterface {
  register: (component: ComponentRegistryEntry<any>) => void
  getAll: () => Record<string, ComponentRegistryEntry<any>>
  get: (name: string) => ComponentRegistryEntry<any>['component']
  has: (name: string) => boolean
  override: (component: ComponentRegistryEntry<any>) => void
  registerToSlot: (slotName: string, component: ComponentRegistryEntry<any>) => void
  getSlotComponents: (slotName: string) => Array<ComponentRegistryEntry<any>>
  getComponentConfig: (name: string) => ComponentRegistryConfigEntry
  registerConfig: (config: Record<string, ComponentRegistryConfigEntry>) => void
}

@injectable()
export class ComponentRegistry implements ComponentRegistryInterface {
  private registry: Record<string, ComponentRegistryEntry<any>> = {}
  private slots: Record<string, Array<ComponentRegistryEntry<any>>> = {}
  private readonly configs: Array<Record<string, ComponentRegistryConfigEntry>> = [componentConfig] // Start with the default componentConfig

  register (component: ComponentRegistryEntry<any>): void {
    const componentConfig = this.getComponentConfig(component.name)

    if (componentConfig.type !== ComponentType.SINGLE) {
      trackError(new GeneralError(`Component "${component.name}" is not configured as a single component. Use registerToSlot instead.`))
    }

    if (this.has(component.name)) {
      trackError(new GeneralError(`Component with the name "${component.name}" already exists. Use the override method to override it`))
    }

    this.registry[component.name] = component
  }

  getAll (): Record<string, ComponentRegistryEntry<any>> {
    return this.registry
  }

  get<T>(name: string): ComponentRegistryEntry<T>['component'] {
    if (!this.has(name)) {
      trackError(new GeneralError(`No component with the name "${name}" found`))
    }

    return this.registry[name].component
  }

  has (name: string): boolean {
    return name in this.registry
  }

  override <T>(component: ComponentRegistryEntry<T>): void {
    if (!this.has(component.name)) {
      trackError(new GeneralError(`No component named "${component.name}" found to override`))
    }

    this.registry[component.name] = component
  }

  registerToSlot (slotName: string, component: ComponentRegistryEntry<any>): void {
    const componentConfig = this.getComponentConfig(slotName)
    if (componentConfig.type !== ComponentType.SLOT) {
      trackError(new GeneralError(`Slot "${slotName}" is not configured as a multiple component slot.`))
    }

    if (isUndefined(this.slots[slotName])) {
      this.slots[slotName] = []
    }
    this.slots[slotName].push(component)
    this.slots[slotName].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)) // Sort by priority
  }

  getSlotComponents (slotName: string): Array<ComponentRegistryEntry<any>> {
    return this.slots[slotName] ?? []
  }

  registerConfig (config: Record<string, ComponentRegistryConfigEntry>): void {
    this.configs.push(config)
  }

  getComponentConfig (name: string): ComponentRegistryConfigEntry {
    for (const config of this.configs) {
      if (!isUndefined(config[name])) {
        return config[name]
      }
    }

    throw new Error(`Component configuration for "${name}" not found.`)
  }
}

export { componentId } from './component-ids'
export * from './component-renderer'
export * from './use-component-registry'
