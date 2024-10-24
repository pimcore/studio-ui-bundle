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

import { useContext } from 'react'
import { defaultTagFiltersOptions, TagFiltersContext, type ITagFiltersContext } from '../tag-filters-provider'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface UseFiltersHookReturn extends ITagFiltersContext {
  addOrUpdateFieldFilter: (value: any) => void
  resetFilters: () => void
}

export interface FieldFilter {
  type: string
  filterValue: {
    considerChildTags: boolean
    tags: string[]
  }
}

const TYPE = 'system.tag'

export const useTagFilters = (): UseFiltersHookReturn => {
  const { filterOptions, setFilterOptions } = useContext(TagFiltersContext)

  function resetFilters (): void {
    setFilterOptions(defaultTagFiltersOptions)
  }

  function addOrUpdateFieldFilter (value: any): void {
    const fieldFilters = filterOptions.columnFilters
    let newFilters: FieldFilter[] = []

    if (isEmptyValue(fieldFilters)) {
      newFilters = [{
        type: TYPE,
        filterValue: value
      }]

      setFilterOptions((filterOptions) => {
        return {
          ...filterOptions,
          columnFilters: newFilters
        }
      })

      return
    }

    setFilterOptions((filterOptions) => {
      return {
        ...filterOptions,
        columnFilters: newFilters
      }
    })
  }

  return {
    filterOptions,
    setFilterOptions,
    addOrUpdateFieldFilter,
    resetFilters
  }
}
