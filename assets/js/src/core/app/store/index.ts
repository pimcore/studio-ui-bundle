/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Reducer, combineSlices, configureStore, type CombinedSliceReducer, createDynamicMiddleware, type MiddlewareApiConfig } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api as pimcoreApi } from '@sdk/api'
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger'

export interface LazyloadedSlices { };

interface SliceLike<ReducerPath extends string, State> {
  reducerPath: ReducerPath
  reducer: Reducer<State>
}

type AnySliceLike = SliceLike<string, any>

type RootReducer = CombinedSliceReducer<Record<string, any>, Record<string, any>>
type DynamicMiddlewareInstance = ReturnType<typeof createDynamicMiddleware>

// The store type is CAPTURED from this builder rather than written out. configureStore's
// generics encode the exact middleware tuple, and that tuple is what gives AppDispatch its
// thunk and RTK-Query typing for the whole admin; spelling the type by hand would silently
// widen it. The builder sits on an object literal deliberately —
// @typescript-eslint/explicit-function-return-type demands a written return type on a plain
// function declaration, which is precisely the type we do not want to write.
const storeBuilder = {
  build (rootReducer: RootReducer, dynamicMiddleware: DynamicMiddlewareInstance) {
    return configureStore({
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
  }
}

export interface StoreInstance {
  store: ReturnType<typeof storeBuilder.build>
  rootReducer: RootReducer
  injectSliceWithState: (newSlice: AnySliceLike) => RootReducer
  addMiddleware: DynamicMiddlewareInstance['addMiddleware']
  withMiddleware: DynamicMiddlewareInstance['withMiddleware']
}

// SPIKE S-B: store creation as a factory so each host (admin, external portal)
// can own an isolated store. createStore() with no side effects on a global;
// the admin keeps the exact same public API via the default instance below.
export function createStore (): StoreInstance {
  const slices: AnySliceLike[] = [
    pimcoreApi
  ]

  const createRootReducer = (): RootReducer => {
    return combineSlices({}, ...slices).withLazyLoadedSlices<LazyloadedSlices>()
  }

  const dynamicMiddleware = createDynamicMiddleware()

  const rootReducer = createRootReducer()

  const store = storeBuilder.build(rootReducer, dynamicMiddleware)

  const injectSliceWithState = (newSlice: AnySliceLike): RootReducer => {
    slices.push(newSlice)

    const updatedRootReducer = createRootReducer()
    store.replaceReducer(updatedRootReducer)

    return updatedRootReducer
  }

  return {
    store,
    rootReducer,
    injectSliceWithState,
    addMiddleware: dynamicMiddleware.addMiddleware,
    withMiddleware: dynamicMiddleware.withMiddleware
  }
}

// Default (admin) instance — preserves the existing public API unchanged.
const defaultInstance = createStore()

export const store = defaultInstance.store
export const rootReducer = defaultInstance.rootReducer
export const injectSliceWithState = defaultInstance.injectSliceWithState

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const addAppMiddleware = defaultInstance.addMiddleware.withTypes<MiddlewareApiConfig>()
export const withAppMiddleware = defaultInstance.withMiddleware.withTypes<MiddlewareApiConfig>()
