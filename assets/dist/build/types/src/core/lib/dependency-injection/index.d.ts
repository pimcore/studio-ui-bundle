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
interface DiInstance {
    container: Container;
    ContainerContext: React.Context<Container>;
    ContainerProvider: React.FC<{
        children: React.ReactNode;
    }>;
    useInjection: <T>(identifier: string) => T;
    useOptionalInjection: <T>(identifier: string) => T | null;
    useMultiInjection: <T>(identifier: string) => T[];
}
export declare function createDiInstance(): DiInstance;
export {};
//# sourceMappingURL=index.d.ts.map