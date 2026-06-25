/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import {
  type AnyFilterDescriptor,
  type FilterHostAdapter,
  createFiltersStore
} from '@Pimcore/components/filters'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import {
  useDynamicTypeResolver,
  type UseDynamicTypeResolverReturnType
} from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { columnsFilterDescriptor } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filter'
import { searchTermFilterDescriptor } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/search-filters/search-term-filter'

export type ReportColumnFilter = NonNullable<IGridFilter['columnFilters']>[number]

export type ReportFilterContribution = ReportColumnFilter[]

export interface ReportFilterContext {
  getType: UseDynamicTypeResolverReturnType['getType']
}

export const {
  FiltersStoreProvider: ReportsDraftFiltersProvider,
  useFiltersStore: useReportsDraftFilters
} = createFiltersStore()

export const reportsFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<ReportFilterContribution, ReportFilterContext>> = [
  searchTermFilterDescriptor,
  columnsFilterDescriptor
]

export const useReportsFilterContext = (): ReportFilterContext => {
  const { getType } = useDynamicTypeResolver()

  return { getType }
}

export const reportsFilterAdapter: FilterHostAdapter<ReportFilterContribution, ReportFilterContext, IGridFilter> = {
  descriptors: reportsFilterDescriptors,
  useBuildContext: useReportsFilterContext,
  composeIntoQuery: (contributions, baseFilter) => ({
    ...baseFilter,
    columnFilters: contributions.flat()
  })
}

export const ReportsDraftFiltersReset = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const draftStore = useReportsDraftFilters()
  const { reportDetailData } = useReportDataContext()

  useEffect(() => {
    draftStore.reset()
  }, [reportDetailData, draftStore.reset])

  return <>{children}</>
}
