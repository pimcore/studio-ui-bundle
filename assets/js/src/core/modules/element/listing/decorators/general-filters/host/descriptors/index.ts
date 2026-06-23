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
import { type ElementFilterContribution, type ElementListingFilterContext } from '../element-listing-filter-context'
import { searchTermFilterDescriptor } from './search-term-filter'
import { directChildrenFilterDescriptor } from './direct-children-filter'
import { unreferencedFilterDescriptor } from './unreferenced-filter'
import { pqlFilterDescriptor } from './pql-filter'
import { fieldFiltersFilterDescriptor } from './field-filters-filter'

export const elementListingFilterDescriptors: ReadonlyArray<
  AnyFilterDescriptor<ElementFilterContribution, ElementListingFilterContext>
> = [
  searchTermFilterDescriptor,
  directChildrenFilterDescriptor,
  unreferencedFilterDescriptor,
  pqlFilterDescriptor,
  fieldFiltersFilterDescriptor
]

export {
  searchTermFilterDescriptor,
  directChildrenFilterDescriptor,
  unreferencedFilterDescriptor,
  pqlFilterDescriptor,
  fieldFiltersFilterDescriptor
}
