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

import { type Reducer, combineSlices, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api as pimcoreApi } from '@Pimcore/app/api/pimcore'
import { type CombinedSliceReducer } from '@reduxjs/toolkit/dist/combineSlices'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyloadedSlices {};

interface SliceLike<ReducerPath extends string, State> {
  reducerPath: ReducerPath
  reducer: Reducer<State>
}

type AnySliceLike = SliceLike<string, any>

const slices: AnySliceLike[] = [
  pimcoreApi
]

export let rootReducer = combineSlices({}, ...slices).withLazyLoadedSlices<LazyloadedSlices>()

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pimcoreApi.middleware)
})

export const injectSliceWithState = (newSlice: AnySliceLike): CombinedSliceReducer<Record<string, any>, Record<string, any>> => {
  slices.push(newSlice)

  rootReducer = combineSlices({}, ...slices).withLazyLoadedSlices<LazyloadedSlices>()
  store.replaceReducer(rootReducer)

  return rootReducer
}

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
