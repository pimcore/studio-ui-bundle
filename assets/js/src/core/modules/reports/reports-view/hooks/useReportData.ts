/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import {
  type BundleCustomReportsDetails,
  type CustomReportsChartApiResponse,
  useCustomReportsChartMutation,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface UseReportDataProps {
  name: string
}

interface UseReportDataReturn {
  reportDetailData: BundleCustomReportsDetails | undefined
  chartDetailData: CustomReportsChartApiResponse | undefined
  isLoading: boolean
  isFetching: boolean
  refetchAll: () => void
}

export const useReportData = ({ name }: UseReportDataProps): UseReportDataReturn => {
  const previousName = useRef<string | undefined>(undefined)

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

  useEffect(() => {
    if (!isEmptyValue(name) && name !== previousName.current) {
      fetchChartDetail({ body: { name } }).catch(e => { console.error(e) })

      previousName.current = name
    }
  }, [name, fetchChartDetail])

  const isLoading = isReportDetailLoading ?? isChartDetailLoading
  const isFetching = isReportDetailFetching ?? isChartDetailLoading

  const refetchAll = (): void => {
    reportDetailRefetch().catch(e => { console.error(e) })
    fetchChartDetail({ body: { name } }).catch(e => { console.error(e) })
  }

  return {
    reportDetailData,
    chartDetailData,
    isLoading,
    isFetching,
    refetchAll
  }
}
