/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { Pie } from '@ant-design/plots'
import { isEmpty } from 'lodash'
import { ChartLegend } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/chart-legend/chart-legend'
import { generateRandomColors } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import type { CustomReportChartData } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import type { IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import { CHART_FIELD_VALUE_KEY, CHART_FIELD_TYPE_KEY } from '@Pimcore/modules/reports/reports-view/components/report-chart/constants/chart-data'

interface IPieChartProps {
  reportChartData: IChartDataItem[]
  chartData?: CustomReportChartData[]
  pieColumn: string
}

export const PieChart = ({ chartData, reportChartData, pieColumn }: IPieChartProps): React.JSX.Element => {
  const [colorList] = useState<string[]>(generateRandomColors(reportChartData?.length))
  const [disabledItems, setDisabledItems] = useState<string[]>([])
  const [chartRef, setChartRef] = useState<any>(null)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    const totalCountValue: number = chartData?.reduce((sum, item) => sum + item?.[pieColumn], 0)

    setTotalCount(totalCountValue ?? 0)
  }, [chartData])

  const handleLegendItemClick = (itemKey: string): void => {
    const newDisabledItems = disabledItems?.includes(itemKey)
      ? disabledItems.filter(item => item !== itemKey)
      : [...disabledItems, itemKey]

    setDisabledItems(newDisabledItems)

    if (chartRef !== null) {
      const chart = chartRef.chart

      const filteredData = isEmpty(newDisabledItems)
        ? reportChartData
        : reportChartData.filter((item: IChartDataItem) => !newDisabledItems.includes(item[CHART_FIELD_TYPE_KEY]))
      setTotalCount(filteredData.reduce((sum, item) => sum + item[CHART_FIELD_VALUE_KEY], 0))

      chart.changeData(filteredData)
    }
  }

  const config = {
    data: reportChartData,
    colorField: CHART_FIELD_TYPE_KEY,
    angleField: CHART_FIELD_VALUE_KEY,
    autoFit: true,
    scale: {
      color: {
        type: 'ordinal',
        range: colorList
      }
    },
    innerRadius: 0.6,
    legend: false,
    onReady: (plot: any) => {
      setChartRef(plot)
    },
    tooltip: {
      items: [
        (datum) => ({
          name: `${datum.type}:`,
          value: `${datum.value} (${Math.round((datum.value * 100) / totalCount)}%)`
        })
      ]
    },
    annotations: [
      {
        type: 'text',
        data: [],
        style: {
          text: totalCount.toString(),
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold'
        }
      }
    ]
  }

  return (
    <Flex
      align="center"
      style={ { maxHeight: '400px' } }
    >
      <Pie { ...config } />
      <ChartLegend
        colorList={ colorList }
        data={ reportChartData }
        disabledItems={ disabledItems }
        handleLegendItemClick={ handleLegendItemClick }
      />
    </Flex>
  )
}
