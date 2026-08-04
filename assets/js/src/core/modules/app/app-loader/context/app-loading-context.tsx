/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, useCallback, useContext, useEffect } from 'react'

export interface AppLoadingContextValue {
  registerLoader: (id: string) => void
  unregisterLoader: (id: string) => void
  isAppLoading: boolean
}

export const AppLoadingContext = createContext<AppLoadingContextValue>({
  registerLoader: () => {},
  unregisterLoader: () => {},
  isAppLoading: false
})

/**
 * Register a named loading participant with the AppLoader background gate.
 * The background stays visible until every registered participant calls the
 * returned `setLoaded` callback (or the component unmounts).
 */
export const useRegisterAppLoading = (id: string): (() => void) => {
  const { registerLoader, unregisterLoader } = useContext(AppLoadingContext)

  useEffect(() => {
    registerLoader(id)
    return () => { unregisterLoader(id) }
  }, [id])

  return useCallback(() => { unregisterLoader(id) }, [unregisterLoader, id])
}

/**
 * Returns true while the initial app loading sequence is still in progress.
 * Use this to suppress loading indicators that are redundant during the
 * initial load (the animated background already covers the screen).
 */
export const useIsAppLoading = (): boolean => {
  return useContext(AppLoadingContext).isAppLoading
}
