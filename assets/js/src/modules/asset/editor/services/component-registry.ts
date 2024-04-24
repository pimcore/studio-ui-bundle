import { container } from '@Pimcore/app/depency-injection'
import { injectable } from 'inversify'

export const serviceName = Symbol.for('asset/editor/services/component-registry')

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

container.bind(serviceName).to(ComponentRegistryService).inSingletonScope()
