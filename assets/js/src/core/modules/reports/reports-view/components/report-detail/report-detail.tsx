/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { ReportsChart } from '@Pimcore/modules/reports/components/reports-chart/reports-chart'
import {
  useCustomReportsChartQuery,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

interface IReportDetailProps {
  currentReport: string
  page: number
  pageSize: number
}

export const ReportDetail = ({ currentReport, page, pageSize }: IReportDetailProps): React.JSX.Element => {
  const { isLoading: isReportDetailLoading, data: reportDetailData } = useCustomReportsReportQuery({ name: currentReport })
  const { isLoading: isChartDetailLoading, data: chartDetailData } = useCustomReportsChartQuery({ name: currentReport, page, pageSize })

  console.log('----- isLoading: ', isReportDetailLoading, isChartDetailLoading)
  console.log('----- reportDetailData: ', reportDetailData)
  console.log('----- chartDetailData: ', chartDetailData)

  return (
    <div>
      <p>ReportDetail</p>
      <ReportsChart />
    </div>
  )
}
