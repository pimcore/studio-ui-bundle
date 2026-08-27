/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type AnyFilterDescriptor,
  type FilterHostAdapter,
  createFiltersStore,
  defineFilter
} from '@Pimcore/components/filters'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { useRelationFilterColumns } from './provider/relation-filter-columns-context'
import type {
  RelationFilterContext,
  RelationFilterContribution,
  RelationFilterQuery,
  RelationRowMatcher
} from './types'
import { createRowMatchers } from './utils/row-matchers'

export const RELATION_COLUMN_FILTERS_KEY = 'columnFilters'

/**
 * The applied filters of a relation grid. Editing happens locally in the header
 * dropdown, only applying a filter writes into this store.
 */
export const {
  FiltersStoreProvider: RelationFiltersStoreProvider,
  useFiltersStore: useRelationFilters,
  useFiltersStoreOptional: useRelationFiltersOptional
} = createFiltersStore()

export const useRelationFilterContext = (): RelationFilterContext => {
  const { columns, visibleFieldsMap } = useRelationFilterColumns()
  const { getType } = useDynamicTypeResolver()

  return { columns, visibleFieldsMap, getType }
}

const columnFiltersDescriptor = defineFilter<FieldFilter[], RelationFilterContribution, RelationFilterContext>({
  key: RELATION_COLUMN_FILTERS_KEY,
  defaultValue: [],
  section: 'columns',
  order: 10,
  isEnabled: (context) => context.columns.length > 0,
  toQuery: (value, context) => {
    const matchers = createRowMatchers(value, context)

    if (matchers.length === 0) {
      return undefined
    }

    return { kind: 'rowMatchers', matchers }
  }
})

export const relationFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<RelationFilterContribution, RelationFilterContext>> = [
  columnFiltersDescriptor
]

export const relationFilterAdapter: FilterHostAdapter<RelationFilterContribution, RelationFilterContext, RelationFilterQuery> = {
  descriptors: relationFilterDescriptors,
  useBuildContext: useRelationFilterContext,
  composeIntoQuery: (contributions, baseQuery) => {
    const matchers: RelationRowMatcher[] = []

    for (const contribution of contributions) {
      matchers.push(...contribution.matchers)
    }

    if (matchers.length === 0) {
      return baseQuery
    }

    return { ...baseQuery, matchRow: (item) => matchers.every((matcher) => matcher(item)) }
  }
}
