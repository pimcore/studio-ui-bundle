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
import { searchTermFilterType } from '../context-layer/provider/search-term-filter/search-term-filter-provider'
import { pqlFilterType } from '../context-layer/provider/pql-filter/pql-filter-provider'
import { unreferencedFilterType } from './definitions/unreferenced-filter'
import {
  type ElementFilterQueryPart,
  type ElementFilterContext,
  type ElementListingFilters,
  type ElementListingQueryArgs
} from './element-filter-types'

type LocalizableColumnFilter = ColumnFilter & { key?: string, locale?: string | null }

export const buildElementFilterQuery = (
  contributions: ElementFilterQueryPart[],
  baseArgs: ElementListingQueryArgs,
  context: ElementFilterContext
): ElementListingQueryArgs => {
  const { availableColumns, currentLanguage } = context

  const isDataObject = 'classId' in baseArgs
  const baseFilters = baseArgs.body.filters

  const columnsToFilterOut = new Set([
    ...availableColumns.map((column) => column.key),
    pqlFilterType, searchTermFilterType, unreferencedFilterType,
    // Mode filter types must not survive from restored base filters (e.g. a saved search): the
    // backend rejects duplicate simple column filters of these types with a 422.
    ...(context.searchMode?.registeredFilterTypes ?? [])
  ])

  const retainedColumnFilters = (baseFilters.columnFilters ?? [])
    .filter((columnFilter) => !columnsToFilterOut.has(columnFilter.type))

  let filters: ElementListingFilters = { ...baseFilters }
  const columnFilters: ColumnFilter[] = [...retainedColumnFilters]

  for (const contribution of contributions) {
    if (contribution.kind === 'columnFilters') {
      columnFilters.push(...contribution.filters)
    } else {
      filters = contribution.apply(filters)
    }
  }

  const getColumnLocale = (columnKey: string | undefined, providedLocale: string | null | undefined): string | null => {
    if (providedLocale === 'default' || columnKey === undefined) {
      return null
    }

    const column = availableColumns.find((col) => col.key === columnKey)

    return column?.localizable === true ? (providedLocale ?? (isDataObject ? currentLanguage : null)) : null
  }

  return {
    ...baseArgs,
    body: {
      ...baseArgs.body,
      filters: {
        ...filters,
        columnFilters: columnFilters.map((columnFilter) => {
          const localizable = columnFilter as LocalizableColumnFilter

          return { ...localizable, locale: getColumnLocale(localizable.key, localizable.locale) }
        })
      }
    }
  }
}
