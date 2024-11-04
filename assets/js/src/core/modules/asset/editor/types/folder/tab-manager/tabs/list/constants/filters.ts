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

import type { FilterOptions, TagFilterOptions } from '../types/filterTypes'

export const DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE: boolean = false

export const defaultFilterOptions: FilterOptions = {
  columnFilters: [],
  includeDescendants: DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE
}

export const defaultTagFilterOptions: TagFilterOptions = {
  columnFilters: []
}
