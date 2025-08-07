/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, type ReactNode, useMemo, type Dispatch, type SetStateAction } from 'react'
import { isUndefined } from 'lodash'

export interface IFilterContext<T> {
  filters: T
  setFilters: Dispatch<SetStateAction<T>>
  resetFilters: () => void
}

export interface IFilterProviderProps<T> {
  children: ReactNode
  initialValue: T
}

export function createFilterContext<T> (): {
  FilterProvider: React.FC<IFilterProviderProps<T>>
  useFilterContext: () => IFilterContext<T>
} {
  const FilterContext = createContext<IFilterContext<T> | undefined>(undefined)

  const FilterProvider = ({ children, initialValue }: IFilterProviderProps<T>): JSX.Element => {
    const [filters, setFilters] = useState<T>(initialValue)

    const resetFilters = (): void => {
      setFilters(initialValue)
    }

    const contextValue = useMemo(() => ({
      filters,
      setFilters,
      resetFilters
    }), [filters, initialValue])

    return (
      <FilterContext.Provider value={ contextValue }>
        {children}
      </FilterContext.Provider>
    )
  }

  function useFilterContext (): IFilterContext<T> {
    const context = useContext(FilterContext)

    if (isUndefined(context)) {
      throw new Error('useFilterContext must be used within a FilterProvider')
    }

    return context
  }

  return {
    FilterProvider,
    useFilterContext
  }
}
