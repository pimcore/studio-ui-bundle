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

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { type GlobalContext, addGlobalContext, selectContextByType, removeGlobalContext } from '@Pimcore/modules/app/global-context/global-context-slice'

export interface GlobalUserContext extends GlobalContext {
  type: 'user'
  config: {
    id: number
  }
}

interface UseGlobalUserContext {
  context: GlobalUserContext | undefined
  setContext: (config: GlobalUserContext['config']) => void
  removeContext: () => void
}

export const useGlobalUserContext = (): UseGlobalUserContext => {
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
