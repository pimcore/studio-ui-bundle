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

export interface GlobalDocumentContext extends GlobalContext {
  type: 'document'
  config: {
    id: number
  }
}

interface UseGlobalDocumentContext {
  context: GlobalDocumentContext | undefined
  setContext: (config: GlobalDocumentContext['config']) => void
  removeContext: () => void
}

export const useGlobalDocumentContext = (): UseGlobalDocumentContext => {
  const disptach = useAppDispatch()
  const context = useAppSelector(state => selectContextByType(state, 'document')) as GlobalDocumentContext | undefined

  const setContext = function (config: GlobalDocumentContext['config']): void {
    disptach(addGlobalContext({
      type: 'document',
      config
    }))
  }

  const removeContext = function (): void {
    disptach(removeGlobalContext('document'))
  }

  return {
    context,
    setContext,
    removeContext
  }
}
