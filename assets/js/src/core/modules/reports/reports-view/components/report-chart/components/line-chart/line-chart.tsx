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
import { Line } from '@ant-design/plots'
import { toNumber } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import type { IChartProps } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'

const CHART_FIELD_NAME_KEY = 'name'
const CHART_FIELD_VALUE_KEY = 'value'

export const LineChart = ({ chartData, reportData, chartLabelMap }: IChartProps): React.JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const xAxis: string = reportData?.xAxis ?? ''
  const formattedChartData = chartData.flatMap((item: object) => {
    return Object.entries(item)
      .filter(([key]) => key !== xAxis)
      .map(([key, value]) => ({
        [xAxis]: item?.[xAxis],
        [CHART_FIELD_NAME_KEY]: key,
        [CHART_FIELD_VALUE_KEY]: toNumber(value)
      }))
  })

  const config = {
    data: formattedChartData,
    xField: xAxis,
    yField: CHART_FIELD_VALUE_KEY,
    seriesField: CHART_FIELD_NAME_KEY,
    colorField: CHART_FIELD_NAME_KEY,
    point: {
      shapeField: 'circle',
      sizeField: 4
    },
    legend: {
      color: {
        position: 'bottom',
        labelFormatter: (text: any) => chartLabelMap[text] ?? text
      }
    }
  }

  return (
    <Flex>
      <Line { ...config } />
    </Flex>
  )
}
