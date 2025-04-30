/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
