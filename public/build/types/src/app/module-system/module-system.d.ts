interface AbstractModule {
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