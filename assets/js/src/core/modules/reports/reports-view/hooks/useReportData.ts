/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import {
  type CustomReportDetails,
  type CustomReportsChartApiResponse,
  useCustomReportsChartQuery,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface UseReportDataProps {
  name: string
}

interface UseReportDataReturn {
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  reportDetailData: CustomReportDetails | undefined
  chartDetailData: CustomReportsChartApiResponse | undefined
  isLoading: boolean
  isFetching: boolean
  refetchAll: () => void
}

export const useReportData = ({ name }: UseReportDataProps): UseReportDataReturn => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    isLoading: isReportDetailLoading,
    data: reportDetailData,
    refetch: reportDetailRefetch,
    isFetching: isReportDetailFetching
  } = useCustomReportsReportQuery({ name }, { skip: isEmptyValue(name), refetchOnMountOrArgChange: true })

  const {
    isLoading: isChartDetailLoading,
    data: chartDetailData,
    refetch: chartDetailRefetch,
    isFetching: isChartDetailFetching
  } = useCustomReportsChartQuery({ name, page, pageSize }, { skip: isEmptyValue(name), refetchOnMountOrArgChange: true })

  const isLoading = isReportDetailLoading ?? isChartDetailLoading
  const isFetching = isReportDetailFetching ?? isChartDetailFetching

  const refetchAll = (): void => {
    reportDetailRefetch().catch(e => { console.error(e) })
    chartDetailRefetch().catch(e => { console.error(e) })
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }
}
