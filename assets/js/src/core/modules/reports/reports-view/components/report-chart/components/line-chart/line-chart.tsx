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
import type { ChartProps, ReportDataProps } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'

export interface ILineChartProps {
  chartData: ChartProps
  reportData: ReportDataProps
}

export const LineChart = ({ chartData, reportData }: ILineChartProps): React.JSX.Element => {
  const config = {
    data: chartData,
    xField: reportData?.xAxis,
    yField: reportData?.yAxis,
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
