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

export interface GlobalDataObjectContext extends GlobalContext {
  type: 'data-object'
  config: {
    id: number
  }
}

interface UseGlobalDataObjectContext {
  context: GlobalDataObjectContext | undefined
  setContext: (config: GlobalDataObjectContext['config']) => void
  removeContext: () => void
}

export const useGlobalDataObjectContext = (): UseGlobalDataObjectContext => {
  const disptach = useAppDispatch()
  const context = useAppSelector(state => selectContextByType(state, 'data-object')) as GlobalDataObjectContext | undefined

  const setContext = function (config: GlobalDataObjectContext['config']): void {
    disptach(addGlobalContext({
      type: 'data-object',
      config
    }))
  }

  const removeContext = function (): void {
    disptach(removeGlobalContext('data-object'))
  }

  return {
    context,
    setContext,
    removeContext
  }
}
