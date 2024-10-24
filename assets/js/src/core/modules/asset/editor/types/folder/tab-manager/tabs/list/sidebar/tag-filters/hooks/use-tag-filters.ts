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

interface UseFiltersHookReturn extends ITagFiltersContext {
  addOrUpdateFieldFilter: (value: any) => void
  resetFilters: () => void
}

const TYPE = 'system.tag'

export const useTagFilters = (): UseFiltersHookReturn => {
  const { filterOptions, setFilterOptions } = useContext(TagFiltersContext)

  const resetFilters = (): void => { setFilterOptions(defaultTagFiltersOptions) }

  const addOrUpdateFieldFilter = (value: any): void => {
    setFilterOptions((filterOptions) => {
      return {
        ...filterOptions,
        columnFilters: [{
          type: TYPE,
          filterValue: {
            considerChildTags: true,
            tags: value
          }
        }]
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
