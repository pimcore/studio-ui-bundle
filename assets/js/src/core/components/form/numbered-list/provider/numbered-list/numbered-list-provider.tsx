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

export const NumberedListProvider = ({ children, ...props }: NumberedListProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <NumberedListContext.Provider value={ { ...props } }>
      {children}
    </NumberedListContext.Provider>
  ), [props, children])
}
