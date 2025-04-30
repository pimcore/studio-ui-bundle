/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type INodeApiHookContext, NodeApiHookContext } from './node-api-hook-provider'

export const useNodeApiHook = (): INodeApiHookContext => {
  const context = useContext(NodeApiHookContext)

  if (context === undefined) {
    throw new Error('useNodeApiHook must be used within a NodeApiHookProvider')
  }

  return context
}
