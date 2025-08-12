/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { NumberedListContext } from '@Pimcore/components/form/numbered-list/provider/numbered-list/numbered-list-provider'
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

export type KeyedListContextProps = KeyedListData | undefined

export const KeyedListContext = createContext<KeyedListContextProps>(undefined)

export interface KeyedListProviderProps {
  children: React.ReactNode
  values: KeyedListData['values']
  operations: KeyedListData['operations']
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

export const KeyedListProvider = ({ children, values, operations, getAdditionalComponentProps }: KeyedListProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    values,
    operations,
    getAdditionalComponentProps
  }), [values, operations, getAdditionalComponentProps])

  return (
    <NumberedListContext.Provider value={ undefined }>
      <KeyedListContext.Provider value={ contextValue }>
        {children}
      </KeyedListContext.Provider>
    </NumberedListContext.Provider>
  )
}
