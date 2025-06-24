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

export interface IUserContext {
  id: number
}

export interface IUserProviderProps {
  id: number
  children?: React.ReactNode
}

export const UserContext = createContext<IUserContext>({ id: -1 })

export const UserManagementProvider = ({ id, children }: IUserProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <UserContext.Provider value={ { id } }>
      {children}
    </UserContext.Provider>
  ), [id])
}
