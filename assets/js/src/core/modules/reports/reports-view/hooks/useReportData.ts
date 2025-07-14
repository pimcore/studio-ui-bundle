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
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface UseReportDataProps {
  name: string
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

export const useReportData = ({ name, page, pageSize }: UseReportDataProps): UseReportDataReturn => {
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
    fetchChartDetail({ body: { name, page, pageSize } }).catch(e => { console.error(e) })
  }

  useEffect(() => {
    if (!isEmptyValue(name)) {
      fetchChartDetailData()
    }
  }, [name, page, pageSize, fetchChartDetail])

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
