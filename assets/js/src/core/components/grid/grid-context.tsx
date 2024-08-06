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

import React, { type RefObject, createContext, useMemo } from 'react'

export interface IGridContext {
  table: RefObject<HTMLTableElement> | null
}

export const GridContext = createContext<IGridContext>({
  table: null
})

export interface GridContextProviderProps extends IGridContext {
  children: React.ReactNode
}

export const GridContextProvider = ({ table, children }: GridContextProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <GridContext.Provider value={ { table } }>
      {children}
    </GridContext.Provider>
  ), [table, children])
}
