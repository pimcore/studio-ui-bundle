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
import { type NodeApiHook } from '../../types/node-api-hook'

export interface INodeApiHookContext {
  nodeApiHook: NodeApiHook
}

export const NodeApiHookContext = createContext<INodeApiHookContext | undefined>(undefined)

export interface NodeApiHookProviderProps {
  nodeApiHook: NodeApiHook
  children: React.ReactNode
}

export const NodeApiHookProvider = ({ nodeApiHook, children }: NodeApiHookProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({ nodeApiHook }), [nodeApiHook])

  return (
    <NodeApiHookContext.Provider value={ contextValue }>
      {children}
    </NodeApiHookContext.Provider>
  )
}
