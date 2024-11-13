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

export interface IUserContext {
  id: number
}

export interface IUserProviderProps {
  id: number
  children?: React.ReactNode
}

export const UserContext = createContext<IUserContext>({ id: -1 })

export const UserProvider = ({ id, children }: IUserProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <UserContext.Provider value={ { id } }>
      {children}
    </UserContext.Provider>
  ), [id])
}
