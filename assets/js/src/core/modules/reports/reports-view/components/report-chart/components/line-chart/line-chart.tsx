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
import { Flex } from '@Pimcore/components/flex/flex'
import { Line } from '@ant-design/plots'
import { CHART_FIELD_VALUE_KEY } from '@Pimcore/modules/reports/reports-view/components/report-chart/constants/chart-data'
import {
  type CustomReportChartData,
  type CustomReportDetails
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export interface ILineChartProps {
  chartData: CustomReportChartData[]
  reportData: CustomReportDetails
}

export const LineChart = ({ chartData, reportData }: ILineChartProps): React.JSX.Element => {
  const config = {
    data: chartData,
    xField: reportData?.xAxis,
    yField: reportData?.yAxis,
    seriesField: CHART_FIELD_VALUE_KEY,
    point: {
      shapeField: 'square',
      sizeField: 4
    },
    interaction: {
      tooltip: {
        marker: false
      }
    },
    style: {
      lineWidth: 2
    }
  }

  return (
    <Flex>
      <Line { ...config } />
    </Flex>
  )
}
