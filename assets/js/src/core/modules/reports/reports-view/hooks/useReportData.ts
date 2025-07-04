/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import {
  type CustomReportDetails,
  type CustomReportsChartApiResponse,
  useCustomReportsChartQuery,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface UseReportDataProps {
  name: string
  page: number
  pageSize: number
}

interface UseReportDataReturn {
  reportDetailData: CustomReportDetails | undefined
  chartDetailData: CustomReportsChartApiResponse | undefined
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

  const {
    isLoading: isChartDetailLoading,
    data: chartDetailData,
    refetch: chartDetailRefetch,
    isFetching: isChartDetailFetching
  } = useCustomReportsChartQuery({ name, page, pageSize }, { skip: isEmptyValue(name) })

  const isLoading = isReportDetailLoading || isChartDetailLoading
  const isFetching = isReportDetailFetching || isChartDetailFetching

  const refetchAll = (): void => {
    void reportDetailRefetch()
    void chartDetailRefetch()
  }

  return useMemo(() => ({
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }), [
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  ])
}
