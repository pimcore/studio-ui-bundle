/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type UseDynamicTypeResolverReturnType } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { type SearchModeAbstract, type SearchModeContext } from '../search-modes/search-mode-abstract'
import { type GeneralFiltersDecoratorConfig } from '../general-filters-decorator'

export interface ElementFilterSearchModeContext {
  /** Applied non-fulltext mode; undefined = full text. Never a blocked/unavailable mode. */
  activeMode: SearchModeAbstract | undefined
  modeContext: SearchModeContext
  /** Column filter types of all visible modes — stripped from restored base filters. */
  registeredFilterTypes: string[]
}

export interface ElementFilterContext {
  config: GeneralFiltersDecoratorConfig
  availableColumns: AvailableColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
  currentLanguage: string
  searchMode?: ElementFilterSearchModeContext
}

export interface ElementListingFilters {
  includeDescendants?: boolean
  columnFilters?: ColumnFilter[]
}

export interface ElementListingQueryArgs {
  classId?: unknown
  body: {
    filters: ElementListingFilters
    [key: string]: unknown
  }
  [key: string]: unknown
}

export type ElementFilterQueryPart =
  | { kind: 'columnFilters', filters: ColumnFilter[] }
  | { kind: 'argsPatch', apply: (filters: ElementListingFilters) => ElementListingFilters }
