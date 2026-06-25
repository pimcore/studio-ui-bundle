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
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'
import { reportsFilterDescriptors } from './descriptors'
import { type ReportsFilterContext, type ReportsFilterContribution } from './reports-filter-types'

export const useReportsFilterContext = (): ReportsFilterContext => {
  const { getType } = useDynamicTypeResolver()

  return { getType }
}

export const reportsFilterAdapter: FilterHostAdapter<ReportsFilterContribution, ReportsFilterContext, IGridFilter> = {
  descriptors: reportsFilterDescriptors,
  useBuildContext: useReportsFilterContext,
  composeIntoQuery: (contributions, baseFilter) => ({
    ...baseFilter,
    columnFilters: contributions.flat()
  })
}
