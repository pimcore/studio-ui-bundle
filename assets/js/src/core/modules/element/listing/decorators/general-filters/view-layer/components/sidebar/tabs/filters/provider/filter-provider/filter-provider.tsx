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

import { type DirectChildrenFilterData } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/direct-children-filter/direct-children-filter-provider'
import { useDirectChildrenFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/direct-children-filter/use-direct-children-filter'
import { type FieldFiltersData } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { useFieldFilters } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/use-field-filters'
import { type PqlFilterData } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/pql-filter/pql-filter-provider'
import { usePqlFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/pql-filter/use-pql-filter'
import { type SearchTermFilterData } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/search-term-filter/search-term-filter-provider'
import { useSearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/search-term-filter/use-search-term-filter'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export interface FilterProviderData {
  searchTerm: SearchTermFilterData['searchTerm']
  setSearchTerm: SearchTermFilterData['setSearchTerm']
  onlyDirectChildren: DirectChildrenFilterData['onlyDirectChildren']
  setOnlyDirectChildren: DirectChildrenFilterData['setOnlyDirectChildren']
  fieldFilters: FieldFiltersData['fieldFilters']
  setFieldFilters: FieldFiltersData['setFieldFilters']
  pqlQuery: PqlFilterData['pqlQuery']
  setPqlQuery: PqlFilterData['setPqlQuery']
}

export type FilterContextProps = FilterProviderData | undefined

export const FilterProviderContext = createContext<FilterContextProps>(undefined)

export interface FilterProviderProps {
  children: React.ReactNode
}

export const FilterProvider = (props: FilterProviderProps): React.JSX.Element => {
  const { searchTerm: listingSearchTerm } = useSearchTermFilter()
  const { onlyDirectChildren: listingOnlyDirectChildren } = useDirectChildrenFilter()
  const { fieldFilters: listingFieldFilters } = useFieldFilters()
  const { pqlQuery: listingPqlQuery } = usePqlFilter()

  const [searchTerm, setSearchTerm] = useState<FilterProviderData['searchTerm']>(listingSearchTerm)
  const [onlyDirectChildren, setOnlyDirectChildren] = useState<FilterProviderData['onlyDirectChildren']>(listingOnlyDirectChildren)
  const [fieldFilters, setFieldFilters] = useState<FilterProviderData['fieldFilters']>(listingFieldFilters)
  const [pqlQuery, setPqlQuery] = useState<FilterProviderData['pqlQuery']>(listingPqlQuery)

  useEffect(() => {
    setSearchTerm(listingSearchTerm)
  }, [listingSearchTerm])

  useEffect(() => {
    setOnlyDirectChildren(listingOnlyDirectChildren)
  }, [listingOnlyDirectChildren])

  useEffect(() => {
    setFieldFilters(listingFieldFilters)
  }, [listingFieldFilters])

  useEffect(() => {
    setPqlQuery(listingPqlQuery)
  }, [listingPqlQuery])

  return useMemo(() => (
    <FilterProviderContext.Provider value={ {
      searchTerm,
      setSearchTerm,
      onlyDirectChildren,
      setOnlyDirectChildren,
      fieldFilters,
      setFieldFilters,
      pqlQuery,
      setPqlQuery
    } }
    >
      {props.children}
    </FilterProviderContext.Provider>
  ), [searchTerm, onlyDirectChildren, fieldFilters, pqlQuery])
}
