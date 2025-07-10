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
// import { ChartLegend } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/components/chart-legend/chart-legend'
import { generateRandomColors } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import type { CustomReportChartData, CustomReportDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import type { IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
const MOCK_CHART_DATA = [
  { type: 'document', value: 7 },
  { type: 'folder', value: 48 },
  { type: 'image', value: 337 },
  { type: 'text', value: 2 },
  { type: 'video', value: 1 },
  { type: 'audio', value: 15 },
  { type: 'pdf', value: 9 },
  { type: 'spreadsheet', value: 4 },
  { type: 'presentation', value: 6 },
  { type: 'archive', value: 3 },
  { type: 'code', value: 5 },
  { type: 'executable', value: 2 },
  { type: 'script', value: 4 },
  { type: 'font', value: 1 },
  { type: 'ebook', value: 3 },
  { type: 'config', value: 6 },
  { type: 'markdown', value: 7 },
  { type: 'csv', value: 8 },
  { type: 'xml', value: 5 },
  { type: 'json', value: 4 },
  { type: 'yaml', value: 2 },
  { type: 'log', value: 9 },
  { type: 'certificate', value: 1 },
  { type: 'database', value: 2 },
  { type: 'iso', value: 3 },
  { type: 'backup', value: 4 },
  { type: 'bin', value: 2 },
  { type: 'apk', value: 1 },
  { type: 'template', value: 3 },
  { type: 'readme', value: 5 },
  { type: 'key', value: 1 },
  { type: 'license', value: 2 },
  { type: 'thumbnail', value: 4 },
  { type: 'resource', value: 3 },
  { type: 'draft', value: 2 },
  { type: 'note', value: 7 },
  { type: 'svg', value: 6 },
  { type: 'png', value: 5 },
  { type: 'jpg', value: 11 },
  { type: 'gif', value: 3 },
  { type: 'webp', value: 1 },
  { type: 'tiff', value: 1 },
  { type: 'psd', value: 2 },
  { type: 'ai', value: 1 },
  { type: 'sketch', value: 1 },
  { type: 'fig', value: 1 },
  { type: 'csv-export', value: 2 },
  { type: 'report', value: 5 },
  { type: 'manual', value: 3 },
  { type: 'faq', value: 2 }
]
export interface IPieChartProps {
  chartData: CustomReportChartData[]
  reportData: CustomReportDetails
}

const CHART_FIELD_TYPE_KEY = 'type'
const CHART_FIELD_VALUE_KEY = 'value'

export const PieChart = ({ reportData, chartData }: IPieChartProps): React.JSX.Element => {
  const pieLabelColumn = reportData?.pieLabelColumn ?? ''
  const pieColumn = reportData?.pieColumn ?? ''

  const reportChartData: IChartDataItem[] | undefined = chartData?.map(item => ({
    [CHART_FIELD_TYPE_KEY]: item?.[pieLabelColumn],
    [CHART_FIELD_VALUE_KEY]: item?.[pieColumn]
  }))

  const [colorList] = useState<string[]>(generateRandomColors(MOCK_CHART_DATA?.length))
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

  console.log('reportChartData', handleLegendItemClick)

  const config = {
    data: MOCK_CHART_DATA,
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
    legend: {
      color: {
        position: 'right',
        layout: {
          justifyContent: 'center'
        },
        rowPadding: 10,
        itemLabelFontSize: 14
      }
    },
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
    <div>
      <div>
        <Pie { ...config } />
      </div>
      {/* <ChartLegend */}
      {/*  colorList={ colorList } */}
      {/*  data={ reportChartData } */}
      {/*  disabledItems={ disabledItems } */}
      {/*  handleLegendItemClick={ handleLegendItemClick } */}
      {/* /> */}
    </div>
  )
}
