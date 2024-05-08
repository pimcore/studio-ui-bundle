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
export interface AbstractModule {
    onInit: () => void;
}
interface AbstractModuleSystem {
    registerModule: (module: AbstractModule) => void;
    initModules: () => void;
}
export declare class ModuleSystem implements AbstractModuleSystem {
    private readonly registry;
    registerModule(module: AbstractModule): void;
    initModules(): void;
}
declare const moduleSystem: ModuleSystem;
export { moduleSystem };
//# sourceMappingURL=module-system.d.ts.map