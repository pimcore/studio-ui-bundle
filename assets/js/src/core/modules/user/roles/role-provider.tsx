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
