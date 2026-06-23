/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterHostAdapter } from '@Pimcore/components/filters'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { elementListingFilterDescriptors } from './descriptors'
import { composeElementListingQuery } from './compose-element-listing-query'
import {
  type ElementFilterContribution,
  type ElementListingFilterContext,
  type ElementListingQueryArgs
} from './element-listing-filter-context'

export const useElementListingFilterContext = (): ElementListingFilterContext => {
  const config = useGeneralFiltersConfig()
  const { availableColumns } = useAvailableColumns()
  const { getType } = useDynamicTypeResolver()
  const { currentLanguage } = useLanguageSelection()

  return { config, availableColumns, getType, currentLanguage }
}

export const elementListingFilterAdapter: FilterHostAdapter<
  ElementFilterContribution,
  ElementListingFilterContext,
  ElementListingQueryArgs
> = {
  descriptors: elementListingFilterDescriptors,
  useBuildContext: useElementListingFilterContext,
  composeIntoQuery: composeElementListingQuery
}
