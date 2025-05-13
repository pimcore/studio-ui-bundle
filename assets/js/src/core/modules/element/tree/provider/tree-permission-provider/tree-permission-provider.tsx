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
