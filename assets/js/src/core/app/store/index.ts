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

import { type Reducer, combineSlices, configureStore, type CombinedSliceReducer, createDynamicMiddleware, type MiddlewareApiConfig } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api as pimcoreApi } from '@Pimcore/app/api/pimcore'
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyloadedSlices { };

interface SliceLike<ReducerPath extends string, State> {
  reducerPath: ReducerPath
  reducer: Reducer<State>
}

type AnySliceLike = SliceLike<string, any>

const slices: AnySliceLike[] = [
  pimcoreApi
]

const createRootReducer = (): CombinedSliceReducer<Record<string, any>, Record<string, any>> => {
  return combineSlices({}, ...slices).withLazyLoadedSlices<LazyloadedSlices>()
}

const dynamicMiddleware = createDynamicMiddleware()
const {
  addMiddleware,
  withMiddleware
} = dynamicMiddleware

export const rootReducer = createRootReducer()

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['execution-engine/jobReceived'],
        ignoredActionPaths: ['execution-engine', 'meta'],
        ignoredPaths: ['execution-engine', 'meta']
      }
    }).concat(pimcoreApi.middleware, rtkQueryErrorLogger, dynamicMiddleware.middleware)
})

export const injectSliceWithState = (newSlice: AnySliceLike): CombinedSliceReducer<Record<string, any>, Record<string, any>> => {
  slices.push(newSlice)

  const updatedRootReducer = createRootReducer()
  store.replaceReducer(updatedRootReducer)

  return updatedRootReducer
}

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const addAppMiddleware = addMiddleware.withTypes<MiddlewareApiConfig>()
export const withAppMiddleware = withMiddleware.withTypes<MiddlewareApiConfig>()
