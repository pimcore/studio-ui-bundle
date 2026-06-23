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
import { type GeneralFiltersDecoratorConfig } from '../general-filters-decorator'

export interface ElementListingFilterContext {
  config: GeneralFiltersDecoratorConfig
  availableColumns: AvailableColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
  currentLanguage: string
}

export interface ElementListingFilters {
  includeDescendants?: boolean
  columnFilters?: ColumnFilter[]
}

/**
 * The element-listing grid request args this host folds filters into. Loosely
 * typed because several endpoints share the contract (data-object/asset grid and
 * search queries); `classId` presence marks a data-object query (drives the
 * localized-column fallback locale).
 */
export interface ElementListingQueryArgs {
  classId?: unknown
  body: {
    filters: ElementListingFilters
    [key: string]: unknown
  }
  [key: string]: unknown
}

export type ElementFilterContribution =
  | { kind: 'columnFilters', filters: ColumnFilter[] }
  | { kind: 'argsPatch', apply: (filters: ElementListingFilters) => ElementListingFilters }
