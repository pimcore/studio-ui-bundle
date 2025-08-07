/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { KeyedListContext } from '@Pimcore/components/form/keyed-list/provider/keyed-list/keyed-list-provider'
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

export type NumberedListContextProps = NumberedListData | undefined

export const NumberedListContext = createContext<NumberedListContextProps>(undefined)

export interface NumberedListProviderProps {
  children: React.ReactNode
  values: NumberedListData['values']
  operations: NumberedListData['operations']
  onChange?: (value: NumberedListData['values']) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

export const NumberedListProvider = ({ children, values, operations, onChange, getAdditionalComponentProps }: NumberedListProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    values,
    operations,
    onChange,
    getAdditionalComponentProps
  }), [values, operations, onChange, getAdditionalComponentProps])

  return (
    <KeyedListContext.Provider value={ undefined }>
      <NumberedListContext.Provider value={ contextValue }>
        {children}
      </NumberedListContext.Provider>
    </KeyedListContext.Provider>
  )
}
