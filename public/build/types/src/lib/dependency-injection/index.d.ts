import 'reflect-metadata';
import React from 'react';
import { Container } from 'inversify';
interface DiInstance {
    container: Container;
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