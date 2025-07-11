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
import { useStyles } from './line-chart.styles'

const CHART_FIELD_NAME_KEY = 'name'
const CHART_FIELD_VALUE_KEY = 'value'

export const LineChart = ({ chartData, reportData, chartLabelMap }: IChartProps): React.JSX.Element => {
  const { styles } = useStyles()

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
    height: 380,
    point: {
      shapeField: 'circle',
      sizeField: 4
    },
    legend: {
      color: {
        position: 'bottom',
        labelFormatter: (text: any) => chartLabelMap[text] ?? text
      }
    },
    interaction: {
      tooltip: {
        render: (event, { title, items }) => (
          <Flex
            gap="mini"
            vertical
          >
            <div className={ styles.tooltipTitle }>{title}</div>
            <Flex vertical>
              {items.map((item: any) => (
                <Flex
                  gap="small"
                  justify="space-between"
                  key={ item.name }
                >
                  <Flex
                    align={ 'center' }
                    gap="mini"
                  >
                    <div
                      className={ styles.circle }
                      style={ { backgroundColor: item.color } }
                    />
                    <div>{chartLabelMap[item.name] ?? item.name}</div>
                  </Flex>
                  <div className={ styles.tooltipItemValue }>{item.value}</div>
                </Flex>
              ))}
            </Flex>
          </Flex>
        )
      }
    }
  }

  return (
    <div>
      <Line { ...config } />
    </div>
  )
}
