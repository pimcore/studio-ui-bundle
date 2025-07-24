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
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'

interface UseReportDataProps {
  name: string
  filters?: IGridFilter
  page: number
  pageSize: number
}

export type IReportDetailData = BundleCustomReportsDetails | undefined
export type IChartDetailData = CustomReportsChartApiResponse | undefined

interface UseReportDataReturn {
  reportDetailData: IReportDetailData
  chartDetailData: IChartDetailData
  isLoading: boolean
  isFetching: boolean
  refetchAll: () => void
}

export const useReportData = ({ name, filters, page, pageSize }: UseReportDataProps): UseReportDataReturn => {
  const {
    isLoading: isReportDetailLoading,
    data: reportDetailData,
    refetch: reportDetailRefetch,
    isFetching: isReportDetailFetching
  } = useCustomReportsReportQuery({ name }, { skip: isEmptyValue(name) })

  const {
    isLoading: isChartDetailLoading,
    data: chartDetailData,
    refetch: chartDetailRefetch,
    isFetching: isChartDetailFetching
  } = useCustomReportsChartQuery({ body: { name, filters, page, pageSize } }, { skip: isEmptyValue(name) })

  const isLoading: boolean = isReportDetailLoading || isChartDetailLoading
  const isFetching: boolean = isReportDetailFetching || isChartDetailFetching

  const refetchAll = (): void => {
    reportDetailRefetch().catch(e => { console.error(e) })
    chartDetailRefetch().catch(e => { console.error(e) })
  }

  return {
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }
}
