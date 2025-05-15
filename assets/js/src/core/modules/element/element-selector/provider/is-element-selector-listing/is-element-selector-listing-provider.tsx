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

export interface IsElementSelectorContextProps {
  isElementSelector: boolean
}

export const IsElementSelectorContext = createContext<IsElementSelectorContextProps>({
  isElementSelector: false
})

export interface IsElementSelectorListingProviderProps {
  children: React.ReactNode
}

export const IsElementSelectorListingProvider = ({ children }: IsElementSelectorListingProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <IsElementSelectorContext.Provider value={ { isElementSelector: true } }>
      { children }
    </IsElementSelectorContext.Provider>
  ), [children])
}
