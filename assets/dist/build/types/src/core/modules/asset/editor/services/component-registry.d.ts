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