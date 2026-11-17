/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { cloneDeep } from 'lodash'
import { type NumberedListData, type NumberedListStore } from '../provider/numbered-list/numbered-list-provider'

export type NumberedListUpdater = (currentValue: NumberedListData['values']) => NumberedListData['values']

export interface NumberedListState {
  value: NumberedListData['values']
  // the mirror described below; read where the latest value is needed without depending on it
  valueRef: MutableRefObject<NumberedListData['values']>
  setValue: (updater: NumberedListUpdater) => void
  store: NumberedListStore
}

/**
 * The numbered list's value, the external store that publishes it, and the one way to
 * change both — the counterpart of useKeyedListState.
 *
 * The value is mirrored in a ref so that the (referentially stable) operations and the
 * store can read the latest one without depending on it — that is what keeps the provider
 * context from changing on every keystroke. The mirror moves synchronously with each
 * update, ahead of the commit carrying it, so a subscriber notified by an operation
 * already reads the new value.
 */
export const useNumberedListState = (initialValue: NumberedListData['values']): NumberedListState => {
  const [valueState, setValueState] = useState(cloneDeep(initialValue))
  const valueRef = useRef(valueState)
  const listenersRef = useRef<Set<() => void>>(new Set())

  // Subscribers are notified synchronously, in the same event as the state update, so a
  // field reading its value through the store re-renders in the very commit the change
  // schedules. Notifying a commit later is what made the caret jump to the end of a
  // textarea inside a block (service-operations#1667): a keystroke re-renders only the
  // list — the child subtree bails out — so the field is rendered with its previous value,
  // React restores that stale value into the DOM, and the deferred notification then
  // writes the typed one on top of it. Every assignment to value moves the caret behind
  // the last character.
  //
  // The updater is applied to the mirror rather than handed to React, so that successive
  // operations in one event see each other's result exactly as they did when React
  // replayed them: an update that leaves the value unchanged is dropped here, as React
  // dropped it.
  const setValue = useCallback((updater: NumberedListUpdater): void => {
    const newValue = updater(valueRef.current)

    if (newValue === valueRef.current) {
      return
    }

    valueRef.current = newValue
    setValueState(() => newValue)
    listenersRef.current.forEach((listener) => { listener() })
  }, [])

  // Stable external store: subscribers (per item, via useNumberedListValue in
  // provider/numbered-list) read the current value through getSnapshot and are notified
  // by setValue whenever it changes.
  const store = useMemo(() => ({
    subscribe: (listener: () => void): (() => void) => {
      listenersRef.current.add(listener)
      return () => {
        listenersRef.current.delete(listener)
      }
    },
    // must return a stable reference when nothing changed (useSyncExternalStore
    // invariant); the value is only ever replaced through setValue, so
    // valueRef.current is stable between updates.
    getSnapshot: () => valueRef.current
  }), [])

  return { value: valueState, valueRef, setValue, store }
}
