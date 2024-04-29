/// <reference types="react" />
export declare const container: import("inversify/lib/container/container").Container, readonlyContainer: import("@Pimcore/lib/dependency-injection").IReadonlyContainer, ContainerContext: import("react").Context<import("inversify/lib/container/container").Container>, ContainerProvider: import("react").FC<{
    children: import("react").ReactNode;
}>, useInjection: <T>(identifier: symbol) => T, useMultiInjection: <T>(identifier: symbol) => T[], useOptionalInjection: <T>(identifier: symbol) => T | null;
//# sourceMappingURL=index.d.ts.map