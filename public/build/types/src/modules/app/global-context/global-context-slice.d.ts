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