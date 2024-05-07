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

export interface GlobalAssetContext extends GlobalContext {
  type: 'asset'
  config: {
    id: number
  }
}

interface UseGlobalAssetContext {
  context: GlobalAssetContext | undefined
  setContext: (config: GlobalAssetContext['config']) => void
  removeContext: () => void
}

export const useGlobalAssetContext = (): UseGlobalAssetContext => {
  const disptach = useAppDispatch()
  const context = useAppSelector(state => selectContextByType(state, 'asset')) as GlobalAssetContext | undefined

  const setContext = function (config: GlobalAssetContext['config']): void {
    disptach(addGlobalContext({
      type: 'asset',
      config
    }))
  }

  const removeContext = function (): void {
    disptach(removeGlobalContext('asset'))
  }

  return {
    context,
    setContext,
    removeContext
  }
}
