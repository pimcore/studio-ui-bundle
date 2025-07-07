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
import { Pie } from '@ant-design/plots'
import { type CustomReportChartData, type CustomReportDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Flex } from '@Pimcore/components/flex/flex'

interface IReportsChartProps {
  chartData?: CustomReportChartData[]
  reportData?: CustomReportDetails
}

const CHART_FIELD_TYPE_KEY = 'type'
const CHART_FIELD_VALUE_KEY = 'value'

export const ReportChart = ({ chartData, reportData }: IReportsChartProps): React.JSX.Element => {
  const pieLabelColumn = reportData?.pieLabelColumn ?? ''
  const pieColumn = reportData?.pieColumn ?? ''

  const totalCount = chartData?.reduce((sum, item) => sum + item?.[pieColumn], 0)
  const reportChartData = chartData?.map(item => ({
    [CHART_FIELD_TYPE_KEY]: item?.[pieLabelColumn],
    [CHART_FIELD_VALUE_KEY]: item?.[pieColumn]
  }))

  const config = {
    data: reportChartData,
    colorField: CHART_FIELD_TYPE_KEY,
    angleField: CHART_FIELD_VALUE_KEY,
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
    <Flex style={ { maxHeight: '350px' } }>
      <Pie { ...config } />
    </Flex>
  )
}
