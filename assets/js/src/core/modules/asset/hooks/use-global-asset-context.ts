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
