/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import {
  type BundleCustomReportsDetails,
  type CustomReportsChartApiResponse,
  useCustomReportsChartMutation,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-inhanced'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type IFilterValue } from '@Pimcore/modules/reports/reports-view/context/grid-context'

interface UseReportDataProps {
  name: string
  filters?: IFilterValue
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

  const [fetchChartDetail, {
    isLoading: isChartDetailLoading,
    data: chartDetailData
  }] = useCustomReportsChartMutation()

  const fetchChartDetailData = (): void => {
    fetchChartDetail({ body: { name, filters, page, pageSize } }).catch(e => { console.error(e) })
  }

  useEffect(() => {
    if (!isEmptyValue(name)) {
      fetchChartDetailData()
    }
  }, [name, filters, page, pageSize, fetchChartDetail])

  const isLoading: boolean = isReportDetailLoading || isChartDetailLoading
  const isFetching: boolean = isReportDetailFetching || isChartDetailLoading

  const refetchAll = (): void => {
    reportDetailRefetch().catch(e => { console.error(e) })
    fetchChartDetailData()
  }

  return {
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }
}
