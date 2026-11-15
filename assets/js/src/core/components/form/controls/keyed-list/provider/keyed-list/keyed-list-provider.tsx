/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { NumberedListContext } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/numbered-list-provider'
import { type NamePath } from 'antd/es/form/interface'
import React, { createContext, useMemo } from 'react'

export interface KeyedListData {
  values: Record<string, any>
  operations: {
    add: (key: string, value?: any) => void
    remove: (key: string) => void
    update: (name: NamePath, value: any, isInitialValue: boolean) => void
    getValue: (name: NamePath) => any
  }
  onChange?: (value: KeyedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

// External store handle for the keyed-list value. Components subscribe to the
// slice they care about (see useKeyedListValue) instead of receiving the whole
// value object through context, so editing one field no longer re-renders every
// other field in the list.
export interface KeyedListStore {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => KeyedListData['values']
}

// The context value is intentionally referentially stable across value changes:
// it carries only the (memoized) operations, the additional-props callback and
// the store handle. The changing value is read reactively through the store.
export interface KeyedListContextValue {
  operations: KeyedListData['operations']
  store: KeyedListStore
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
  /**
   * Puts a field back to the value it was loaded with. Only the owner of the list can
   * do that, so it is undefined when the owner has no notion of a loaded value.
   */
  onFieldRestore?: (field: NamePath) => void
}

export type KeyedListContextProps = KeyedListContextValue | undefined

export const KeyedListContext = createContext<KeyedListContextProps>(undefined)

export interface KeyedListProviderProps {
  children: React.ReactNode
  store: KeyedListStore
  operations: KeyedListData['operations']
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
  onFieldRestore?: (field: NamePath) => void
}

export const KeyedListProvider = ({ children, store, operations, getAdditionalComponentProps, onFieldRestore }: KeyedListProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    operations,
    store,
    getAdditionalComponentProps,
    onFieldRestore
  }), [operations, store, getAdditionalComponentProps, onFieldRestore])

  return (
    <NumberedListContext.Provider value={ undefined }>
      <KeyedListContext.Provider value={ contextValue }>
        {children}
      </KeyedListContext.Provider>
    </NumberedListContext.Provider>
  )
}
