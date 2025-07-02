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
import { isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { ReportChart } from '@Pimcore/modules/reports/components/report-chart/report-chart'
import {
  type CustomReportChartData,
  useCustomReportsChartQuery,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'

interface IReportDetailProps {
  currentReport: string
  page: number
  pageSize: number
}

export const ReportDetail = ({ currentReport, page, pageSize }: IReportDetailProps): React.JSX.Element => {
  const { isLoading: isReportDetailLoading, data: reportDetailData } = useCustomReportsReportQuery({ name: currentReport })
  const { isLoading: isChartDetailLoading, data: chartDetailData } = useCustomReportsChartQuery({ name: currentReport, page, pageSize })

  if (isReportDetailLoading && isChartDetailLoading) {
    return <Content loading />
  }

  const isShowChart = !isEmptyValue(reportDetailData?.chartType)
  const chartData: CustomReportChartData[] | undefined =
      !isUndefined(chartDetailData) && 'data' in chartDetailData
        ? chartDetailData.data as CustomReportChartData[]
        : undefined

  return (
    <Flex>
      {isShowChart && !isUndefined(chartData) && (
        <ReportChart
          chartData={ chartData }
          reportData={ reportDetailData }
        />
      )}
    </Flex>
  )
}
