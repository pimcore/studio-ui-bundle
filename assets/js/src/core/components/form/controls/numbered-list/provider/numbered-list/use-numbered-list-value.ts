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
import { NumberedListContext, type NumberedListContextValue } from './numbered-list-provider'

// Stable access to the numbered-list context (operations, store, additional props)
// without subscribing to the value — reading this never triggers a re-render.
export const useNumberedListContext = (): NumberedListContextValue => {
  const context = useContext(NumberedListContext)

  if (context === undefined) {
    throw new Error('useNumberedListContext must be used within a NumberedListProvider')
  }

  return context
}

// Subscribes to a single item's slice of the numbered-list value. The snapshot is
// cached by content equality, so unrelated item edits (which clone the whole value
// array) do not change this slice's reference and do not re-render the subscriber.
export const useNumberedListValue = (name: NamePath): any => {
  const { store, operations } = useNumberedListContext()
  const cacheRef = useRef<{ initialized: boolean, snapshot: any }>({ initialized: false, snapshot: undefined })

  const nameKey = Array.isArray(name) ? name.join('.') : String(name)

  const getSnapshot = useCallback((): any => {
    const next = operations.getValue(name)

    if (cacheRef.current.initialized && isEqual(cacheRef.current.snapshot, next)) {
      return cacheRef.current.snapshot
    }

    cacheRef.current = { initialized: true, snapshot: next }
    return next
    // depends on `operations` and `nameKey` (the serialized `name`)
  }, [operations, nameKey])

  return useSyncExternalStore(store.subscribe, getSnapshot)
}

// Subscribes to a derived projection of the numbered-list value (e.g. item count).
// The selector result is cached by content equality, so the component only
// re-renders when the projection changes, not on every value edit. Pass a
// referentially stable `selector` (module-level or useCallback).
export const useNumberedListSelector = <T = any>(selector: (values: any[]) => T): T => {
  const { store } = useNumberedListContext()
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
