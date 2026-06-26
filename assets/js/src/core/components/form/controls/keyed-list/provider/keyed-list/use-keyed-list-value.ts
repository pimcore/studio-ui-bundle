/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useContext, useRef, useSyncExternalStore } from 'react'
import { isEqual } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'
import { KeyedListContext, type KeyedListContextValue } from './keyed-list-provider'

// Stable access to the keyed-list context (operations, store, additional props)
// without subscribing to the value — reading this never triggers a re-render.
export const useKeyedListContext = (): KeyedListContextValue => {
  const context = useContext(KeyedListContext)

  if (context === undefined) {
    throw new Error('useKeyedListContext must be used within a KeyedListProvider')
  }

  return context
}

// Subscribes to a single field's slice of the keyed-list value. Because the
// snapshot is cached by content equality, unrelated field edits (which clone the
// whole value object) do not change this slice's reference and therefore do not
// re-render the subscribing component.
export const useKeyedListValue = (name: NamePath): any => {
  const { store, operations } = useKeyedListContext()
  const cacheRef = useRef<{ initialized: boolean, snapshot: any }>({ initialized: false, snapshot: undefined })

  const nameKey = Array.isArray(name) ? name.join('.') : String(name)

  const getSnapshot = useCallback((): any => {
    const next = operations.getValue(name)

    if (cacheRef.current.initialized && isEqual(cacheRef.current.snapshot, next)) {
      return cacheRef.current.snapshot
    }

    cacheRef.current = { initialized: true, snapshot: next }
    return next
    // depends on `operations` and `nameKey` (the serialized `name`); `name` itself is
    // intentionally read through the stable `nameKey` so the path is recomputed correctly
  }, [operations, nameKey])

  return useSyncExternalStore(store.subscribe, getSnapshot)
}

// Subscribes to a derived projection of the keyed-list value. The selector result
// is cached by content equality, so the component only re-renders when the
// projection actually changes (e.g. list structure) and not on every value edit.
// Pass a referentially stable `selector` (module-level or useCallback).
export const useKeyedListSelector = <T = any>(selector: (values: Record<string, any>) => T): T => {
  const { store } = useKeyedListContext()
  const cacheRef = useRef<{ initialized: boolean, snapshot: T }>({ initialized: false, snapshot: undefined as unknown as T })

  const getSnapshot = useCallback((): T => {
    const next = selector(store.getSnapshot())

    if (cacheRef.current.initialized && isEqual(cacheRef.current.snapshot, next)) {
      return cacheRef.current.snapshot
    }

    cacheRef.current = { initialized: true, snapshot: next }
    return next
  }, [store, selector])

  return useSyncExternalStore(store.subscribe, getSnapshot)
}
