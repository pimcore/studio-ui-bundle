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
import { type TreePermission } from '../../../../perspectives/enums/tree-permission'

export interface ITreePermissionContext {
  permissions: {
    [key in TreePermission]?: boolean
  } & Record<string, boolean>
}

export const TreePermissionContext = createContext<ITreePermissionContext | undefined>(undefined)

export interface TreePermissionProviderProps {
  permissions: ITreePermissionContext['permissions']
  children: React.ReactNode
}

export const TreePermissionProvider = ({ children, permissions }: TreePermissionProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    permissions
  }), [permissions])

  return (
    <TreePermissionContext.Provider value={ contextValue }>
      {children}
    </TreePermissionContext.Provider>
  )
}
