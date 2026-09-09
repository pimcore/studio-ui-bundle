/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AnyFilterDescriptor, type FilterValues } from './types'
import { composeQuery } from './query/compose-query'

export interface FilterHostAdapter<TContribution, TContext, TQuery> {
  descriptors: ReadonlyArray<AnyFilterDescriptor<TContribution, TContext>>
  useBuildContext: () => TContext
  composeIntoQuery: (contributions: TContribution[], baseQuery: TQuery, context: TContext) => TQuery
}

/**
 * `overrides` lets a caller build the query from values that are not in `appliedValues` yet.
 * A filter that applies itself immediately (Enter in a text field) writes its value into the
 * store in the same render, so the value has to be passed in explicitly.
 */
export const useFilterQuery = <TContribution, TContext, TQuery>(
  adapter: FilterHostAdapter<TContribution, TContext, TQuery>,
  appliedValues: FilterValues
): ((baseQuery: TQuery, overrides?: FilterValues) => TQuery) => {
  const context = adapter.useBuildContext()

  return (baseQuery, overrides) => adapter.composeIntoQuery(
    composeQuery(adapter.descriptors, overrides === undefined ? appliedValues : { ...appliedValues, ...overrides }, context),
    baseQuery,
    context
  )
}
