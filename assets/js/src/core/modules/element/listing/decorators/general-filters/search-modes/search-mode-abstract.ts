/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'

/** 'all' = the quick search's All tab: no listing, no filters, no type/class selects. */
export type SearchModeSurfaceType = ElementType | 'all'

export interface SearchModeContext {
  elementType: SearchModeSurfaceType
  /** Selected class of the data-object listing; undefined on asset listings and "All classes". */
  classId: string | undefined
  className: string | undefined
  /** Field filters as currently drafted/applied in the host listing. */
  fieldFilters: FieldFilter[]
  /** Value of the element-type select in the search-modal top bar; undefined outside it. */
  selectedTypeFilter: string | null | undefined
  /** True when the listing will actually send a sortFilter (an explicit, resolvable column sort). */
  hasExplicitSorting: boolean
  /** The user narrowed the listing to a sub-type (type select, or a "type" field filter). */
  explicitTypeSelection: boolean
  /** The listing is pinned to one class (a chosen class, or a grid that always has one). */
  explicitClassSelection: boolean
}

export interface SearchModeAvailability {
  /** Selectable in the mode dropdown; false = can never work on this surface (hidden). */
  available: boolean
  /** Menu-entry subtitle, pre-translated (e.g. "Types: image"). */
  hint?: string
  /** Informational line under the search input, pre-translated. A search that contradicts it simply returns nothing. */
  warning?: string
}

/** Same shape as the quick search's simple-search item, so the All tab renders both alike. */
export type GlobalSearchResultItem = SimpleSearchResult

export interface GlobalSearchResult {
  totalItems: number
  items: GlobalSearchResultItem[]
}

export interface GlobalSearchArgs {
  query: string
  page: number
  pageSize: number
}

export interface GlobalSearchState {
  data?: GlobalSearchResult
  isLoading: boolean
  isError: boolean
  error?: unknown
}

/**
 * Data source for the quick search's All tab. useSearch is a React hook: core calls it from a
 * component keyed per mode, so switching modes remounts and hook order stays stable.
 */
export interface GlobalSearchAdapter {
  useSearch: (args: GlobalSearchArgs) => GlobalSearchState
}

/**
 * A search mode changes what the listing search input emits: the built-in full-text mode sends the
 * system.fulltext column filter, registered modes contribute their own column filter instead.
 * Registered via SearchModeRegistry; labels and hints are returned pre-translated by the mode.
 */
@injectable()
export abstract class SearchModeAbstract extends DynamicTypeAbstract {
  /** Column filter type this mode emits — stripped from restored base filters to avoid duplicates. */
  abstract readonly columnFilterType: string

  abstract readonly order: number

  /** Icon name from the icon library, shown in the mode dropdown menu. */
  abstract readonly icon: string

  abstract getMenuLabel (): string

  abstract getCollapsedLabel (): string

  /** Hidden entirely when false (feature gates, permissions). */
  isVisible (): boolean {
    return true
  }

  abstract getAvailability (context: SearchModeContext): SearchModeAvailability

  abstract buildColumnFilter (query: string, context: SearchModeContext): ColumnFilter

  /** Implemented by modes that can serve the quick search's All tab; undefined = not offered there. */
  getGlobalSearch? (): GlobalSearchAdapter
}
