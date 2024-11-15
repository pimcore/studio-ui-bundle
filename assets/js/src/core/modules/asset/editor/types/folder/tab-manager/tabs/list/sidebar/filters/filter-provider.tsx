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

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type FilterOptions, type IFilterContext } from '../../types/filterTypes'
import { defaultFilterOptions } from '../../constants/filters'

export const FilterContext = createContext<IFilterContext>({
  filterOptions: defaultFilterOptions,
  setFilterOptions: () => {},
  filterError: undefined
})

interface FilterProviderProps {
  children: React.ReactNode
  errorData?: FetchBaseQueryError
}

export const FilterProvider = ({ children, errorData }: FilterProviderProps): React.JSX.Element => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions)
  const [filterError, setFilterError] = useState<IFilterContext['filterError']>(undefined)

  useEffect(() => {
    setFilterError(errorData)
  }, [errorData])

  return useMemo(() => (
    <FilterContext.Provider value={ { filterOptions, setFilterOptions, filterError } }>
      {children}
    </FilterContext.Provider>
  ), [filterOptions, filterError, children])
}
