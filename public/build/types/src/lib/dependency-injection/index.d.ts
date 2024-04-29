import React from 'react';
import { Container } from 'inversify';
export interface IReadonlyContainer {
    get: Container['get'];
    getAll: Container['getAll'];
}
interface DiInstance {
    container: Container;
    readonlyContainer: IReadonlyContainer;
    ContainerContext: React.Context<Container>;
    ContainerProvider: React.FC<{
        children: React.ReactNode;
    }>;
    useInjection: <T>(identifier: symbol) => T;
    useOptionalInjection: <T>(identifier: symbol) => T | null;
    useMultiInjection: <T>(identifier: symbol) => T[];
}
export declare function createDiInstance(): DiInstance;
export {};
//# sourceMappingURL=index.d.ts.map