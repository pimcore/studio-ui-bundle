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

import React, { createContext, useMemo } from 'react'

export interface IDataObjectContext {
  id: number
}

export interface IDataObjectProviderProps {
  id: number
  children?: React.ReactNode
}

export const DataObjectContext = createContext<IDataObjectContext>({ id: 0 })

export const DataObjectProvider = ({ id, children }: IDataObjectProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <DataObjectContext.Provider value={ { id } }>
      {children}
    </DataObjectContext.Provider>
  ), [id])
}
