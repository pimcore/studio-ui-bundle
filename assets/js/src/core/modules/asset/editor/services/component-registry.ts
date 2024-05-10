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
