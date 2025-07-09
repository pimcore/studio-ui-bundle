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
import { Column } from '@ant-design/plots'
import {
  type CustomReportChartData,
  type CustomReportDetails
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export interface IBarChartProps {
  chartData: CustomReportChartData[]
  reportData: CustomReportDetails
}

export const BarChart = ({ chartData, reportData }: IBarChartProps): React.JSX.Element => {
  const config = {
    data: chartData,
    xField: reportData?.xAxis,
    yField: reportData?.yAxis?.[0] ?? reportData?.yAxis
  }

  return (
    <Flex>
      <Column { ...config } />
    </Flex>
  )
}
