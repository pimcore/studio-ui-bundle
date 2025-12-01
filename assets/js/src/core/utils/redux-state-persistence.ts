/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { debounce, isNil, isUndefined, isFunction, isEqual } from 'lodash'
import { getLocalStorageItem, setLocalStorageItem } from './local-storage'

export const loadReduxState = <T>(key: string): T | undefined => {
  try {
    const serializedState = getLocalStorageItem(key)
    if (isNil(serializedState)) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.warn(`Could not load state for key "${key}"`, err)
    return undefined
  }
}

/**
 * Higher-Order Reducer to automatically persist state changes.
 * Acts like a middleware for a specific slice.
 *
 * @param reducer The original slice reducer
 * @param key The local storage key
 * @param selector Optional selector to persist only part of the state
 * @param condition Optional condition function to determine if state should be saved
 */
export const createPersistedReduxReducer = <S, A extends UnknownAction>(
  reducer: Reducer<S, A>,
  key: string | ((state: S) => string),
  selector: (state: S) => any = (s) => s,
  condition: (state: S) => boolean = () => true
): Reducer<S, A> => {
  let lastSavedData: any

  const save = debounce((state: S) => {
    try {
      const data = selector(state)
      const storageKey = isFunction(key) ? key(state) : key

      if (!isEqual(data, lastSavedData)) {
        const json = JSON.stringify(data)
        setLocalStorageItem(storageKey, json)
        lastSavedData = data
      }
    } catch (err) {
      console.warn('Could not save state', err)
    }
  }, 200)

  return (state, action) => {
    const newState = reducer(state, action)

    if (state !== newState && !isUndefined(newState)) {
      if (condition(newState)) {
        save(newState)
      }
    }

    return newState
  }
}
