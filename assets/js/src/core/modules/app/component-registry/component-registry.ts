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

interface ContextMenuEntry<T> {
  name: string
  component: React.ComponentType<T>
}

export interface ComponentRegistryInterface {
  register: (component: ContextMenuEntry<any>) => void
  getAll: () => Record<string, ContextMenuEntry<any>>
  get: (name: string) => ContextMenuEntry<any>['component']
  has: (name: string) => boolean
  override: (name: string, component: ContextMenuEntry<any>) => void
}

@injectable()
export class ComponentRegistry implements ComponentRegistryInterface {
  private registry: Record<string, ContextMenuEntry<any>> = {}

  register (component: ContextMenuEntry<any>): void {
    // TODO: throw exception if component already exists

    this.registry[component.name] = component
  }

  getAll (): Record<string, ContextMenuEntry<any>> {
    return this.registry
  }

  get<T>(name: string): ContextMenuEntry<T>['component'] {
    // TODO: exception

    return this.registry[name].component
  }

  has (name: string): boolean {
    return name in this.registry
  }

  override <T>(name: string, component: ContextMenuEntry<T>): void {
    // TODO: throw exception if `name` is not present in this.registry
  }
}

const componentRegistry = new ComponentRegistry()
export { componentRegistry }
