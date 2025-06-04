/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useState, useMemo } from 'react'

export interface SearchContextData {
  setSearchValue: (tabId: string, value: string) => void
  getSearchValue: (tabId: string) => string
}

export const SearchContext = createContext<SearchContextData | undefined>(undefined)

export interface SearchProviderProps {
  children: React.ReactNode
}

export const ClassificationStoreProvider = ({ children }: SearchProviderProps): React.JSX.Element => {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({})

  const getSearchValue = useCallback((tabId: string): string => {
    return searchValues[tabId] ?? ''
  }, [searchValues])

  const setSearchValue = useCallback((tabId: string, value: string): void => {
    setSearchValues(prev => ({
      ...prev,
      [tabId]: value
    }))
  }, [])

  const contextValue = useMemo(() => ({
    getSearchValue,
    setSearchValue
  }), [getSearchValue, setSearchValue])

  return (
    <SearchContext.Provider value={ contextValue }>
      {children}
    </SearchContext.Provider>
  )
}
