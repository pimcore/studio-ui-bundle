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
import { Pie } from '@ant-design/plots'
import { isEmpty } from 'lodash'
import { generateRandomColors } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import type { IChartProps, IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import { ChartLegend } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/components/chart-legend/chart-legend'

export interface IChartPieDataItem extends IChartDataItem {
  color: string
}

const CHART_FIELD_TYPE_KEY = 'type'
const CHART_FIELD_VALUE_KEY = 'value'
const CHART_FIELD_COLOR_KEY = 'color'

export const PieChart = ({ reportData, chartData }: IChartProps): React.JSX.Element => {
  const pieLabelColumn = reportData?.pieLabelColumn ?? ''
  const pieColumn = reportData?.pieColumn ?? ''

  const [colorList] = useState<string[]>(generateRandomColors(chartData?.length))
  const reportChartData: IChartPieDataItem[] = chartData.map(((item, index) => ({
    [CHART_FIELD_TYPE_KEY]: item?.[pieLabelColumn],
    [CHART_FIELD_VALUE_KEY]: item?.[pieColumn],
    [CHART_FIELD_COLOR_KEY]: colorList[index]
  })))

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
    colorField: CHART_FIELD_COLOR_KEY,
    angleField: CHART_FIELD_VALUE_KEY,
    autoFit: true,
    height: 250,
    scale: {
      color: {
        type: 'identity'
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
          name: `${datum.type}`,
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
    <div>
      <Pie { ...config } />
      <ChartLegend
        data={ reportChartData }
        disabledItems={ disabledItems }
        handleLegendItemClick={ handleLegendItemClick }
      />
    </div>
  )
}
