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
import { useDraftFilters } from './stores'

export interface ElementListingFilterValues {
  searchTerm: string
  directChildren: boolean
  unreferenced: boolean
  pql: string
  fieldFilters: FieldFilter[]
}

export const readElementListingFilterValues = (values: FilterValues): ElementListingFilterValues => ({
  searchTerm: (values.searchTerm ?? '') as string,
  directChildren: (values.directChildren ?? false) as boolean,
  unreferenced: (values.unreferenced ?? false) as boolean,
  pql: (values.pql ?? '') as string,
  fieldFilters: (values.fieldFilters ?? []) as FieldFilter[]
})

export interface UseDraftElementFiltersReturn extends ElementListingFilterValues {
  setSearchTerm: (value: string) => void
  setDirectChildren: (value: boolean) => void
  setUnreferenced: (value: boolean) => void
  setPql: (value: string) => void
  setFieldFilters: (value: FieldFilter[]) => void
  reset: () => void
}

export const useDraftElementFilters = (): UseDraftElementFiltersReturn => {
  const { values, setValue, reset } = useDraftFilters()

  return {
    ...readElementListingFilterValues(values),
    setSearchTerm: (value) => { setValue('searchTerm', value) },
    setDirectChildren: (value) => { setValue('directChildren', value) },
    setUnreferenced: (value) => { setValue('unreferenced', value) },
    setPql: (value) => { setValue('pql', value) },
    setFieldFilters: (value) => { setValue('fieldFilters', value) },
    reset
  }
}
