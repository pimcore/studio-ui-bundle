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
import { PieChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart'
import { LineChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart'

interface IReportsChartProps {
  chartData?: CustomReportChartData[]
  reportData?: CustomReportDetails
}

export const ReportChart = ({ chartData, reportData }: IReportsChartProps): React.JSX.Element => {
  if (isUndefined(reportData) || isUndefined(chartData)) {
    return <Content loading />
  }

  const chartType = reportData?.chartType ?? 'default'

  const commonProps = {
    reportData,
    chartData
  }

  switch (chartType) {
    case 'pie':
      return <PieChart { ...commonProps } />
    case 'line':
      return <LineChart { ...commonProps } />
    default:
      return <PieChart { ...commonProps } />
  }
}
