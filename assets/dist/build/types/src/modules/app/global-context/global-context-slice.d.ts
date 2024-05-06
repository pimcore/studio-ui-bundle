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
export interface GlobalContext {
    type: string;
    config: Record<string, unknown>;
}
export declare const addGlobalContext: import("@reduxjs/toolkit").ActionCreatorWithPayload<GlobalContext, "global-context/addGlobalContext">, removeGlobalContext: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "global-context/removeGlobalContext">;
export declare const selectContextByType: import("reselect").Selector<{
    [x: string]: any;
}, GlobalContext | undefined, [type: string]> & {
    unwrapped: (state: GlobalContext[], type: string) => GlobalContext | undefined;
};
//# sourceMappingURL=global-context-slice.d.ts.map