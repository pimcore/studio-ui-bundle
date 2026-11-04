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
  type BundleCustomReportsDetails,
  type CustomReportsChartApiResponse,
  useCustomReportsChartQuery,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { getCustomReportDefinitionAdapter, providesCustomReportView } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/get-custom-report-definition-adapter'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'
import { type ISorting } from '@Pimcore/modules/reports/reports-view/context/report-data-context'

interface IUseReportDataProps {
  name: string
  filters?: IGridFilter
  page: number
  pageSize: number
  sorting?: ISorting
}

export type IReportDetailData = BundleCustomReportsDetails | undefined
export type IChartDetailData = CustomReportsChartApiResponse | undefined

export interface IUseReportDataReturn {
  reportDetailData: IReportDetailData
  chartDetailData: IChartDetailData
  isLoading: boolean
  isFetching: boolean
  refetchAll: () => void
}

export const useReportData = ({ name, filters, page, pageSize, sorting }: IUseReportDataProps): IUseReportDataReturn => {
  const {
    isLoading: isReportDetailLoading,
    data: reportDetailData,
    currentData: currentReportDetailData,
    refetch: reportDetailRefetch,
    isFetching: isReportDetailFetching
  } = useCustomReportsReportQuery({ name }, { skip: isEmptyValue(name) })

  // An adapter that renders its own view loads its data itself; the generic chart request would run the report twice.
  // currentData is undefined until the details of this very report are loaded, so the adapter is never taken from a previous report.
  const adapter = getCustomReportDefinitionAdapter((currentReportDetailData?.dataSourceConfig as ISourceDefinition | undefined)?.type, false)
  const skipChartQuery = isEmptyValue(name) || isUndefined(currentReportDetailData) || providesCustomReportView(adapter)

  const {
    isLoading: isChartDetailLoading,
    data: chartDetailData,
    refetch: chartDetailRefetch,
    isFetching: isChartDetailFetching
  } = useCustomReportsChartQuery({ body: { name, filters, page, pageSize, sortBy: sorting?.sortBy, sortOrder: sorting?.sortOrder } }, { skip: skipChartQuery })

  const isLoading: boolean = isReportDetailLoading || isChartDetailLoading
  const isFetching: boolean = isReportDetailFetching || isChartDetailFetching

  const refetchAll = (): void => {
    reportDetailRefetch().catch(e => { console.error(e) })
    // refetching a skipped query throws
    if (!skipChartQuery) {
      chartDetailRefetch().catch(e => { console.error(e) })
    }
  }

  return {
    reportDetailData,
    // a skipped query keeps the result of the previously selected report
    chartDetailData: skipChartQuery ? undefined : chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }
}
