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
