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
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'

export interface SearchModeContext {
  elementType: ElementType
  /** Selected class of the data-object listing; undefined on asset listings. */
  classId: string | undefined
  className: string | undefined
  /** Field filters as currently drafted/applied in the host listing. */
  fieldFilters: FieldFilter[]
  /** Value of the element-type select in the search-modal top bar; undefined outside it. */
  selectedTypeFilter: string | null | undefined
  /** True when the listing will actually send a sortFilter (an explicit, resolvable column sort). */
  hasExplicitSorting: boolean
}

export interface SearchModeAvailability {
  /** Selectable in the mode dropdown. */
  available: boolean
  /** Selected but preconditions unmet — the search must not be submitted. */
  blocked: boolean
  /** Menu-entry subtitle, pre-translated (e.g. "Types: image"). */
  hint?: string
  /** Warning line under the search input, pre-translated. */
  warning?: string
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
}
