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
import { 
  setGlobalDefaultContext as setDefaultContextAction, 
  selectContextByType,
  type GlobalDefaultContext
} from '@Pimcore/modules/app/global-context/global-context-slice'

export const useGlobalDefaultContext = (): { context: GlobalDefaultContext | null } => {
  const context = useAppSelector((state) => selectContextByType(state, 'default')) as GlobalDefaultContext | null
  return { context }
}

export const useGlobalDefaultContextActions = (): {
  setGlobalDefaultContext: (context: GlobalDefaultContext) => void
} => {
  const dispatch = useAppDispatch()
  
  return {
    setGlobalDefaultContext: (context: GlobalDefaultContext) => {
      dispatch(setDefaultContextAction(context))
    }
  }
}
