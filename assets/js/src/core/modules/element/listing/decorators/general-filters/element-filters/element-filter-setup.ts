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
import { useSearchMode } from '../search-modes/use-search-mode'
import { elementFilterDefinitions } from './definitions'
import { buildElementFilterQuery } from './build-element-filter-query'
import {
  type ElementFilterQueryPart,
  type ElementFilterContext,
  type ElementListingQueryArgs
} from './element-filter-types'

export const useElementFilterContext = (): ElementFilterContext => {
  const config = useGeneralFiltersConfig()
  const { availableColumns } = useAvailableColumns()
  const { getType } = useDynamicTypeResolver()
  const { currentLanguage } = useLanguageSelection()
  const searchMode = useSearchMode('applied')

  return {
    config,
    availableColumns,
    getType,
    currentLanguage,
    searchMode: searchMode === undefined
      ? undefined
      : {
          // A blocked mode must not reach the request — the UI prevents applying it, and a
          // restored blocked state degrades to full text here as the last line of defense.
          activeMode: searchMode.blocked ? undefined : searchMode.activeMode,
          modeContext: searchMode.modeContext,
          registeredFilterTypes: searchMode.modes.map((mode) => mode.columnFilterType)
        }
  }
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
