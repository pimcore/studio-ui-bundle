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
import { type GridFilter } from '@Pimcore/modules/asset/asset-api-slice-enhanced'

export type TagFiltersOptions = Pick<GridFilter, 'columnFilters' | 'includeDescendants'>

export interface ITagFiltersContext {
  filterOptions: TagFiltersOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<TagFiltersOptions>>
}

export const defaultTagFiltersOptions: TagFiltersOptions = {
  columnFilters: [],
  includeDescendants: true
}

export const TagFiltersContext = createContext<ITagFiltersContext>({
  filterOptions: defaultTagFiltersOptions,
  setFilterOptions: () => {}
})

export interface FilterProviderProps {
  children: React.ReactNode
}

export const TagFiltersProvider = ({ children }: FilterProviderProps): React.JSX.Element => {
  const [filterOptions, setFilterOptions] = useState<TagFiltersOptions>(defaultTagFiltersOptions)

  return useMemo(() => (
    <TagFiltersContext.Provider value={ { filterOptions, setFilterOptions } }>
      {children}
    </TagFiltersContext.Provider>
  ), [filterOptions, children])
}
