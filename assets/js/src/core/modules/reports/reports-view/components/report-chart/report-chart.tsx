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
import { fromPairs, isUndefined, map } from 'lodash'
import { Empty } from 'antd'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import { PieChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart'
import { LineChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart'
import { BarChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { CHART_TYPE_BAR, CHART_TYPE_LINE, CHART_TYPE_PIE } from '@Pimcore/modules/reports/constants'

interface IReportsChartProps {
  chartData?: object[]
  reportData?: BundleCustomReportsDetails
  chartConfig?: object[]
}

export const ReportChart = ({ chartData, reportData, chartConfig }: IReportsChartProps): React.JSX.Element => {
  if (isUndefined(reportData) || isUndefined(chartData)) {
    return <Content loading />
  }

  const chartType = reportData?.chartType ?? 'default'
  const chartLabelMap = fromPairs(
    map(reportData?.columnConfigurations, item => [
      item.name,
      !isEmptyValue(item.label) ? item.label : item.name
    ])
  )

  const commonProps = {
    reportData,
    chartData,
    chartLabelMap,
    chartConfig
  }

  if (isEmptyValue(chartData)) {
    return (
      <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
    )
  }

  const chartElement = (() => {
    switch (chartType) {
      case CHART_TYPE_PIE:
        return <PieChart { ...commonProps } />
      case CHART_TYPE_LINE:
        return <LineChart { ...commonProps } />
      case CHART_TYPE_BAR:
        return <BarChart { ...commonProps } />
      default:
        return <PieChart { ...commonProps } />
    }
  })()

  return <div data-testid="report-chart-container">{chartElement}</div>
}
