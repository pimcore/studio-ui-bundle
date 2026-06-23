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

export const useFilterQuery = <TContribution, TContext, TQuery>(
  adapter: FilterHostAdapter<TContribution, TContext, TQuery>,
  appliedValues: FilterValues
): ((baseQuery: TQuery) => TQuery) => {
  const context = adapter.useBuildContext()

  return (baseQuery) => adapter.composeIntoQuery(
    composeQuery(adapter.descriptors, appliedValues, context),
    baseQuery,
    context
  )
}
