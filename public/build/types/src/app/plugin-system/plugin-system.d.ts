import { type Container } from 'inversify';
export interface lifeCycleEvents {
    onInit?: (config: {
        container: Container;
    }) => void;
    onStartup?: () => void;
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