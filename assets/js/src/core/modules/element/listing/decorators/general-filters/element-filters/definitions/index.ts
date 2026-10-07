/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AnyFilterDescriptor, type FilterValues } from '@Pimcore/components/filters'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'
import { searchTermFilterDescriptor } from './search-term-filter'
import { searchModeFilterDescriptor } from './search-mode-filter'
import { directChildrenFilterDescriptor } from './direct-children-filter'
import { unreferencedFilterDescriptor } from './unreferenced-filter'
import { pqlFilterDescriptor } from './pql-filter'
import { fieldFiltersFilterDescriptor, prepareFieldFilters } from './field-filters-filter'

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

/** The neutral state of every filter, i.e. what "Clear all" publishes into the applied store. */
export const elementFilterDefaults: FilterValues = Object.fromEntries(
  elementFilterDefinitions.map(({ key, defaultValue }) => [key, defaultValue])
)

export {
  searchTermFilterDescriptor,
  searchModeFilterDescriptor,
  directChildrenFilterDescriptor,
  unreferencedFilterDescriptor,
  pqlFilterDescriptor,
  fieldFiltersFilterDescriptor,
  prepareFieldFilters
}
