/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch, useAppSelector } from '@sdk/app'
import { type GlobalContext, addGlobalContext, selectContextByType, removeGlobalContext } from '@Pimcore/modules/app/global-context/global-context-slice'

export interface GlobalUserContext extends GlobalContext {
  type: 'user'
  config: {
    id: number
  }
}

interface UseGlobalUserManagementContext {
  context: GlobalUserContext | undefined
  setContext: (config: GlobalUserContext['config']) => void
  removeContext: () => void
}

export const useGlobalUserContext = (): UseGlobalUserManagementContext => {
  const disptach = useAppDispatch()
  const context = useAppSelector(state => selectContextByType(state, 'user')) as GlobalUserContext | undefined

  const setContext = function (config: GlobalUserContext['config']): void {
    disptach(addGlobalContext({
      type: 'user',
      config
    }))
  }

  const removeContext = function (): void {
    disptach(removeGlobalContext('user'))
  }

  return {
    context,
    setContext,
    removeContext
  }
}
