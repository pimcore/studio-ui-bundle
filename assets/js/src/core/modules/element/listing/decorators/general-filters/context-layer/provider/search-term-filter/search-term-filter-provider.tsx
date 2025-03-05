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

import React, { createContext, useMemo, useState } from 'react'

export interface SearchTermFilter {
  type: 'system.fulltext'
  filterValue: string
}

export interface SearchTermFilterData {
  searchTerm: SearchTermFilter['filterValue']
  setSearchTerm: (searchTerm: SearchTermFilter['filterValue']) => void
  getDataQueryFilterArg: () => SearchTermFilter | undefined
}

export const searchTermFilterType = 'system.fulltext'

export type SearchTermFilterContextProps = SearchTermFilterData | undefined

export const SearchTermFilterContext = createContext<SearchTermFilterContextProps>(undefined)

export interface SearchTermFilterProviderProps {
  children: React.ReactNode
}

export const SearchTermFilterProvider = (props: SearchTermFilterProviderProps): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<SearchTermFilter['filterValue']>('')

  const getDataQueryFilterArg: SearchTermFilterData['getDataQueryFilterArg'] = () => {
    if (searchTerm !== '') {
      return {
        type: searchTermFilterType,
        filterValue: searchTerm
      }
    }
  }

  return useMemo(() => (
    <SearchTermFilterContext.Provider value={ { searchTerm, setSearchTerm, getDataQueryFilterArg } }>
      {props.children}
    </SearchTermFilterContext.Provider>
  ), [searchTerm])
}
