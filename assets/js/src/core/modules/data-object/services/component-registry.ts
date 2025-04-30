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

interface ComponentDefinition {
  name: string
  component: React.ComponentType
}

export interface ComponentRegistry {
  registerComponent: (definition: ComponentDefinition) => void
  getComponent: (name: string) => ComponentDefinition | undefined
  getComponents: () => Record<string, ComponentDefinition>
}

@injectable()
export class ComponentRegistryService implements ComponentRegistry {
  private registry: Record<string, ComponentDefinition> = {}

  registerComponent (definition: ComponentDefinition): void {
    this.registry[definition.name] = definition
  }

  hasComponent (name: string): boolean {
    return this.registry[name] !== undefined
  }

  getComponent (name: string): ComponentDefinition | undefined {
    return this.registry[name]
  }

  getComponents (): Record<string, ComponentDefinition> {
    return this.registry
  }
}
