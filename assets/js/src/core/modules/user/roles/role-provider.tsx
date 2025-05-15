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

export interface IRoleContext {
  id: number
}

export interface IRoleProviderProps {
  id: number
  children?: React.ReactNode
}

export const RoleContext = createContext<IRoleContext>({ id: -1 })

export const RoleProvider = ({ id, children }: IRoleProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <RoleContext.Provider value={ { id } }>
      {children}
    </RoleContext.Provider>
  ), [id])
}
