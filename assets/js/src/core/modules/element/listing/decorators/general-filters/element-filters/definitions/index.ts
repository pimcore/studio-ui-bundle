/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AnyFilterDescriptor } from '@Pimcore/components/filters'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'
import { searchTermFilterDescriptor } from './search-term-filter'
import { searchModeFilterDescriptor } from './search-mode-filter'
import { directChildrenFilterDescriptor } from './direct-children-filter'
import { unreferencedFilterDescriptor } from './unreferenced-filter'
import { pqlFilterDescriptor } from './pql-filter'
import { fieldFiltersFilterDescriptor } from './field-filters-filter'

export const elementFilterDefinitions: ReadonlyArray<
  AnyFilterDescriptor<ElementFilterQueryPart, ElementFilterContext>
> = [
  searchTermFilterDescriptor,
  searchModeFilterDescriptor,
  directChildrenFilterDescriptor,
  unreferencedFilterDescriptor,
  pqlFilterDescriptor,
  fieldFiltersFilterDescriptor
]

export {
  searchTermFilterDescriptor,
  searchModeFilterDescriptor,
  directChildrenFilterDescriptor,
  unreferencedFilterDescriptor,
  pqlFilterDescriptor,
  fieldFiltersFilterDescriptor
}
