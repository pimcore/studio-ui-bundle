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
import { type Container } from 'inversify';
import { moduleSystem } from '../module-system/module-system';
export interface lifeCycleEvents {
    onInit?: (config: {
        container: Container;
    }) => void;
    onStartup?: (config: {
        moduleSystem: typeof moduleSystem;
    }) => void;
}
export interface abstractPlugin extends lifeCycleEvents {
    name: string;
}
export declare class PluginSystem {
    private registry;
    loadPlugins(): Promise<void>;
    registerPlugin(plugin: abstractPlugin): void;
    initPlugins(): void;
    startupPlugins(): void;
}
export declare const pluginSystem: PluginSystem;
//# sourceMappingURL=plugin-system.d.ts.map