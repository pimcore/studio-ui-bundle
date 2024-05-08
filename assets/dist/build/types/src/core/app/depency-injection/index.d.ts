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
export declare const container: import("inversify/lib/container/container").Container, readonlyContainer: import("../../lib/dependency-injection").IReadonlyContainer, ContainerContext: import("react").Context<import("inversify/lib/container/container").Container>, ContainerProvider: import("react").FC<{
    children: import("react").ReactNode;
}>, useInjection: <T>(identifier: symbol) => T, useMultiInjection: <T>(identifier: symbol) => T[], useOptionalInjection: <T>(identifier: symbol) => T | null;
//# sourceMappingURL=index.d.ts.map