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
import { type CustomReportChartData, type CustomReportDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { type IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import {
  CHART_COMPONENTS,
  CHART_FIELD_TYPE_KEY,
  CHART_FIELD_VALUE_KEY,
  DEFAULT_CHART_TYPE
} from '@Pimcore/modules/reports/reports-view/components/report-chart/constants/chart-data'

interface IReportsChartProps {
  chartData?: CustomReportChartData[]
  reportData?: CustomReportDetails
}

export const ReportChart = ({ chartData, reportData }: IReportsChartProps): React.JSX.Element => {
  const chartType = reportData?.chartType ?? DEFAULT_CHART_TYPE
  const pieLabelColumn = reportData?.pieLabelColumn ?? ''
  const pieColumn = reportData?.pieColumn ?? ''

  const reportChartData: IChartDataItem[] | undefined = chartData?.map(item => ({
    [CHART_FIELD_TYPE_KEY]: item?.[pieLabelColumn],
    [CHART_FIELD_VALUE_KEY]: item?.[pieColumn]
  }))

  if (isUndefined(reportChartData)) {
    return <Content loading />
  }

  const ChartComponent = CHART_COMPONENTS[chartType]

  return (
    <ChartComponent
      chartData={ chartData }
      pieColumn={ pieColumn }
      reportChartData={ reportChartData }
    />
  )
}
