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