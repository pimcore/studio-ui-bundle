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

/** 'all' is the quick search's All tab: no listing, no filters, no type/class selects. */
export type SearchModeSurfaceType = ElementType | 'all'

export interface SearchModeContext {
  elementType: SearchModeSurfaceType
  /** Class the data-object listing is pinned to; undefined for assets and "All classes". */
  className: string | undefined
  /** Types the user narrowed the listing to (type select or "type" field filter); empty = none. */
  selectedTypes: string[]
  /** True when the listing sends an explicit column sort. */
  hasExplicitSorting: boolean
}

export interface SearchModeAvailability {
  /** False hides the mode on this surface. */
  available: boolean
  /** Subtitle in the mode menu, pre-translated. */
  hint?: string
  /** Line under the search input, pre-translated. */
  warning?: string
}

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

/** Data source for the All tab. useSearch is a React hook; core mounts it in a component keyed per mode. */
export interface GlobalSearchAdapter {
  useSearch: (args: GlobalSearchArgs) => GlobalSearchState
}

/**
 * A search mode decides which column filter the listing search input emits. Full text is built in;
 * a registered mode replaces it with its own filter. Labels and hints come pre-translated.
 */
@injectable()
export abstract class SearchModeAbstract extends DynamicTypeAbstract {
  /** Column filter type this mode emits; stripped from restored base filters. */
  abstract readonly columnFilterType: string

  abstract readonly order: number

  /** Icon library name shown in the mode menu. */
  abstract readonly icon: string

  abstract getMenuLabel (): string

  abstract getCollapsedLabel (): string

  /** False hides the mode everywhere (feature gates, permissions). */
  isVisible (): boolean {
    return true
  }

  abstract getAvailability (context: SearchModeContext): SearchModeAvailability

  abstract buildColumnFilter (query: string, context: SearchModeContext): ColumnFilter

  /** Modes that can serve the All tab return an adapter; undefined = not offered there. */
  getGlobalSearch? (): GlobalSearchAdapter
}
