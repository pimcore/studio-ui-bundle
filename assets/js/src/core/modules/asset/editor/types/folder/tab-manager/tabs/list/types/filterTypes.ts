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

import type React from 'react'
import type { GridFilter } from '@Pimcore/modules/asset/asset-api-slice.gen'

export type FilterOptions = Pick<GridFilter, 'columnFilters' | 'includeDescendants'>

export interface IFilterContext {
  filterOptions: FilterOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
}
