/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterValues } from '@Pimcore/components/filters'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'
import { FULLTEXT_SEARCH_MODE_ID } from '../search-modes/constants'
import { useDraftFilters } from './stores'

export interface ElementFilterValues {
  searchTerm: string
  searchMode: string
  directChildren: boolean
  unreferenced: boolean
  pql: string
  fieldFilters: FieldFilter[]
}

export const readElementFilterValues = (values: FilterValues): ElementFilterValues => ({
  searchTerm: (values.searchTerm ?? '') as string,
  searchMode: (values.searchMode ?? FULLTEXT_SEARCH_MODE_ID) as string,
  directChildren: (values.directChildren ?? false) as boolean,
  unreferenced: (values.unreferenced ?? false) as boolean,
  pql: (values.pql ?? '') as string,
  fieldFilters: (values.fieldFilters ?? []) as FieldFilter[]
})

export interface UseDraftFilterValuesReturn extends ElementFilterValues {
  setSearchTerm: (value: string) => void
  setSearchMode: (value: string) => void
  setDirectChildren: (value: boolean) => void
  setUnreferenced: (value: boolean) => void
  setPql: (value: string) => void
  setFieldFilters: (value: FieldFilter[]) => void
  reset: () => void
}

export const useDraftFilterValues = (): UseDraftFilterValuesReturn => {
  const { values, setValue, reset } = useDraftFilters()

  return {
    ...readElementFilterValues(values),
    setSearchTerm: (value) => { setValue('searchTerm', value) },
    setSearchMode: (value) => { setValue('searchMode', value) },
    setDirectChildren: (value) => { setValue('directChildren', value) },
    setUnreferenced: (value) => { setValue('unreferenced', value) },
    setPql: (value) => { setValue('pql', value) },
    setFieldFilters: (value) => { setValue('fieldFilters', value) },
    reset
  }
}
