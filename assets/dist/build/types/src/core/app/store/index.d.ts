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
import { type Reducer } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook } from 'react-redux';
import { type CombinedSliceReducer } from '@reduxjs/toolkit/dist/combineSlices';
export interface LazyloadedSlices {
}
interface SliceLike<ReducerPath extends string, State> {
    reducerPath: ReducerPath;
    reducer: Reducer<State>;
}
type AnySliceLike = SliceLike<string, any>;
export declare let rootReducer: CombinedSliceReducer<{
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    [x: string]: any;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        [x: string]: any;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const injectSliceWithState: (newSlice: AnySliceLike) => CombinedSliceReducer<Record<string, any>, Record<string, any>>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export declare const useAppDispatch: () => AppDispatch;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export {};
//# sourceMappingURL=index.d.ts.map