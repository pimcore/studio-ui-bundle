/// <reference types="react" />
export declare const serviceName: unique symbol;
interface ComponentDefinition {
    name: string;
    component: React.ComponentType;
}
export interface ComponentRegistry {
    registerComponent: (definition: ComponentDefinition) => void;
    getComponent: (name: string) => ComponentDefinition | undefined;
    getComponents: () => Record<string, ComponentDefinition>;
}
export declare class ComponentRegistryService implements ComponentRegistry {
    private registry;
    registerComponent(definition: ComponentDefinition): void;
    hasComponent(name: string): boolean;
    getComponent(name: string): ComponentDefinition | undefined;
    getComponents(): Record<string, ComponentDefinition>;
}
export {};
//# sourceMappingURL=component-registry.d.ts.map