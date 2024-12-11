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

interface ComponentRegistryEntry<T> {
  name: string
  component: React.ComponentType<T>
}

export interface ComponentRegistryInterface {
  register: (component: ComponentRegistryEntry<any>) => void
  getAll: () => Record<string, ComponentRegistryEntry<any>>
  get: (name: string) => ComponentRegistryEntry<any>['component']
  has: (name: string) => boolean
  override: (name: string, component: ComponentRegistryEntry<any>) => void
}

@injectable()
export class ComponentRegistry implements ComponentRegistryInterface {
  private registry: Record<string, ComponentRegistryEntry<any>> = {}

  register (component: ComponentRegistryEntry<any>): void {
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

  override <T>(name: string, component: ComponentRegistryEntry<T>): void {
    if (!this.has(name)) {
      trackError(new GeneralError(`No component named "${name}" found to override`))
    }

    this.registry[name] = component
  }
}
