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
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useGeneralFiltersConfig } from '../context-layer/provider/general-filters-config/use-general-filters-config'
import { useSearchMode } from '../search-modes/use-search-mode'
import { useFilterableColumns } from '../search-modes/use-filterable-columns'
import { elementFilterDefinitions } from './definitions'
import { buildElementFilterQuery } from './build-element-filter-query'
import {
  type ElementFilterQueryPart,
  type ElementFilterContext,
  type ElementListingQueryArgs
} from './element-filter-types'

export const useElementFilterContext = (): ElementFilterContext => {
  const config = useGeneralFiltersConfig()
  // applied mode only: a mode column filter is never sent without its mode
  const availableColumns = useFilterableColumns('applied')
  const { getType } = useDynamicTypeResolver()
  const { currentLanguage } = useLanguageSelection()
  const searchMode = useSearchMode('applied')

  return { config, availableColumns, getType, currentLanguage, searchMode }
}

export const elementFilterSetup: FilterHostAdapter<
  ElementFilterQueryPart,
  ElementFilterContext,
  ElementListingQueryArgs
> = {
  descriptors: elementFilterDefinitions,
  useBuildContext: useElementFilterContext,
  composeIntoQuery: buildElementFilterQuery
}
