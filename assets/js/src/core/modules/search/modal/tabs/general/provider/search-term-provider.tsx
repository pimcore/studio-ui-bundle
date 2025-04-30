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

export interface SearchTermContextProps {
  searchTerm: string
}

export const SearchTermContext = createContext<SearchTermContextProps>({
  searchTerm: ''
})

export interface SearchTermProviderProps {
  searchTerm: string
  children: React.ReactNode
}

export const SearchTermProvider = (props: SearchTermProviderProps): React.JSX.Element => {
  const { searchTerm, children } = props

  return useMemo(() => (
    <SearchTermContext.Provider value={ { searchTerm } }>
      { children }
    </SearchTermContext.Provider>
  ), [searchTerm, children])
}
