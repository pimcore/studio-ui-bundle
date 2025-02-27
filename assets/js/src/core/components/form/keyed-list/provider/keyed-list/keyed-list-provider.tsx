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

export interface KeyedListData {
  values: Record<string, any>
  operations: {
    add: (key: string, value?: any) => void
    remove: (key: string) => void
    update: (name: NamePath, value: any) => void
    getValue: (name: NamePath) => any
  }
  onChange?: (value: KeyedListData['values']) => void
}

export type KeyedListContextProps = KeyedListData | undefined

export const KeyedListContext = createContext<KeyedListContextProps>(undefined)

export interface KeyedListProviderProps {
  children: React.ReactNode
  values: KeyedListData['values']
  operations: KeyedListData['operations']
  onChange?: (value: KeyedListData['values']) => void
}

export const KeyedListProvider = ({ children, ...props }: KeyedListProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <KeyedListContext.Provider value={ { ...props } }>
      {children}
    </KeyedListContext.Provider>
  ), [props, children])
}
