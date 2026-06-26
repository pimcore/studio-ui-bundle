/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { KeyedListContext } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'
import { LocalizedFieldsContext } from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import { type NamePath } from 'antd/es/form/interface'
import React, { createContext, useMemo } from 'react'

export interface NumberedListData {
  values: any[]
  operations: {
    add: (value?: any, key?: number) => void
    remove: (key: number) => void
    update: (name: NamePath, value: any, isInitialValue: boolean) => void
    move: (from: number, to: number) => void
    getValue: (name: NamePath) => any
  }
  onChange?: (value: NumberedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

// External store handle for the numbered-list value. Components subscribe to the
// slice they care about (see useNumberedListValue) instead of receiving the whole
// value array through context, so editing one item no longer re-renders every
// other item in the list.
export interface NumberedListStore {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => NumberedListData['values']
}

// Referentially stable context value: only the (memoized) operations, the
// optional onChange/additional-props callbacks and the store handle. The changing
// value is read reactively through the store.
export interface NumberedListContextValue {
  operations: NumberedListData['operations']
  store: NumberedListStore
  onChange?: (value: NumberedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

export type NumberedListContextProps = NumberedListContextValue | undefined

export const NumberedListContext = createContext<NumberedListContextProps>(undefined)

export interface NumberedListProviderProps {
  children: React.ReactNode
  store: NumberedListStore
  operations: NumberedListData['operations']
  onChange?: (value: NumberedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

export const NumberedListProvider = ({ children, store, operations, onChange, getAdditionalComponentProps }: NumberedListProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    operations,
    store,
    onChange,
    getAdditionalComponentProps
  }), [operations, store, onChange, getAdditionalComponentProps])

  return (
    <KeyedListContext.Provider value={ undefined }>
      <LocalizedFieldsContext.Provider value={ undefined }>
        <NumberedListContext.Provider value={ contextValue }>
          {children}
        </NumberedListContext.Provider>
      </LocalizedFieldsContext.Provider>
    </KeyedListContext.Provider>
  )
}
