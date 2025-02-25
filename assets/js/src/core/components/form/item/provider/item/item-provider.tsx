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

import { type FormItemProps } from 'antd'
import React, { createContext, useMemo } from 'react'

export interface ItemData extends FormItemProps {}

export type ItemContextProps = ItemData | undefined

export const ItemContext = createContext<ItemContextProps>(undefined)

export interface ItemProviderProps {
  item: ItemData
  children: React.ReactNode
}

export const ItemProvider = ({ item, children }: ItemProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <ItemContext.Provider value={ item }>
      {children}
    </ItemContext.Provider>
  ), [item, children])
}
